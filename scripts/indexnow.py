"""Tell Bing (and Yandex, Seznam, Naver...) about changed pages through IndexNow, right after a deploy.

Usage: python scripts/indexnow.py <previous_commit> <deployed_commit> [extra-blog-slug ...]
Waits until the live site reports <deployed_commit> in /build.txt (written by the build), so it only
submits once Netlify has actually published. If that never happens (the commit was not deployed,
e.g. a draft save), it exits quietly.
"""
import json, os, re, subprocess, sys, time, urllib.request

HOST = 'www.conceptscalicut.com'
BASE = 'https://' + HOST
KEY = '7bdecd1a366e85c8cc48ab1761b452b8'   # also published by the build at /7bdecd1a366e85c8cc48ab1761b452b8.txt

prev, head = (sys.argv + ['', ''])[1:3]
extra = sys.argv[3:]

def get(url, timeout=20):
    req = urllib.request.Request(url, headers={'Cache-Control': 'no-cache', 'User-Agent': 'concepts-indexnow'})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode('utf8', 'replace')

# 1. wait for the deploy of this commit
for i in range(30):
    try:
        if get(f'{BASE}/build.txt?t={int(time.time())}').strip() == head:
            break
    except Exception:
        pass
    time.sleep(30)
else:
    print('Commit was not deployed (or not yet): nothing submitted.')
    sys.exit(0)

# 2. work out which pages changed
changed = []
if prev and set(prev) != {'0'}:
    r = subprocess.run(['git', 'diff', '--name-only', prev, head], capture_output=True, text=True)
    changed = r.stdout.split() if r.returncode == 0 else ['*']
else:
    changed = ['*']
urls = set()
posts = [f for f in changed if f.startswith('blog/posts/') and f.endswith('.md')]
other = [f for f in changed if not f.startswith(('blog/', '.github/', 'scripts/', 'admin/')) and f not in ('README.md',)]
for f in posts:
    urls.add(f'{BASE}/journal/{os.path.basename(f)[:-3]}')
for slug in extra:
    urls.add(f'{BASE}/journal/{slug}')
if posts or extra:
    urls.update({f'{BASE}/', f'{BASE}/ml', f'{BASE}/journal/'})
if other or '*' in changed or not urls:
    # site or build changed: submit every page in the live sitemap
    urls.update(re.findall(r'<loc>([^<]+)</loc>', get(f'{BASE}/sitemap.xml')))
# only submit pages that exist (a draft's file may have changed without being published)
live = []
for u in sorted(urls):
    try:
        get(u); live.append(u)
    except Exception:
        pass
if not live:
    print('No live pages to submit.'); sys.exit(0)

# 3. submit
body = json.dumps({'host': HOST, 'key': KEY, 'keyLocation': f'{BASE}/{KEY}.txt', 'urlList': live[:10000]}).encode()
req = urllib.request.Request('https://api.indexnow.org/indexnow', data=body, method='POST',
                             headers={'Content-Type': 'application/json; charset=utf-8'})
try:
    with urllib.request.urlopen(req, timeout=30) as r:
        print('IndexNow:', r.status, f'- submitted {len(live)} URLs')
except urllib.error.HTTPError as e:
    print('IndexNow error', e.code, e.read().decode()[:300])
for u in live: print(' ', u)
