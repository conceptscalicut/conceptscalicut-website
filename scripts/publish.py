"""Runs in GitHub Actions (.github/workflows/publish.yml).

1. On the Monday schedule, or when "Run workflow" is pressed: if anything is waiting to go live,
   push an empty "[publish]" commit so Netlify builds and deploys the site once.
2. For every blog post that has just gone live and has not been emailed yet, wait until its page
   is online, then email it to the Brevo "Website Subscribers" list.

Secrets / variables (GitHub > Settings > Secrets and variables > Actions):
  BREVO_API_KEY     secret. Without it, no emails are sent (posts are still published).
  BREVO_LIST_ID     variable, default 3 (the "Website Subscribers" list).
  NEWSLETTER_MODE   variable: "send" (default) emails right away; "draft" only creates the
                    campaign in Brevo so the team can review and press Send there.
"""
import datetime
import html
import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request

BASE = 'https://www.conceptscalicut.com'
POSTS_DIR = 'blog/posts'
REGISTRY = 'blog/newsletter-sent.json'
SENDER = {'name': 'Concepts Interiors & Home Decor', 'email': 'info@conceptscalicut.com'}
EVENT = os.environ.get('GITHUB_EVENT_NAME', 'workflow_dispatch')
TODAY = (datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None) + datetime.timedelta(hours=5, minutes=30)).date().isoformat()


def git(*args, check=True):
    r = subprocess.run(['git', *args], capture_output=True, text=True)
    if check and r.returncode:
        print(r.stdout, r.stderr)
        sys.exit(r.returncode)
    return r


def front(path):
    raw = open(path, encoding='utf8').read()
    m = re.match(r'^---\s*\n(.*?)\n---\s*\n?(.*)$', raw, re.S)
    meta = {}
    if m:
        for line in m.group(1).splitlines():
            if ':' in line and not line.startswith(' '):
                k, v = line.split(':', 1)
                v = v.strip()
                if v[:1] in '"\'' and v[-1:] == v[:1]:
                    v = json.loads(v) if v[0] == '"' else v[1:-1]
                meta[k.strip()] = v
    meta['slug'] = os.path.basename(path)[:-3]
    meta['date'] = str(meta.get('date', ''))[:10]
    meta['draft'] = str(meta.get('draft', 'false')).lower() == 'true'
    meta['publish_now'] = str(meta.get('publish_now', 'false')).lower() == 'true'
    return meta


posts = [front(os.path.join(POSTS_DIR, f)) for f in sorted(os.listdir(POSTS_DIR)) if f.endswith('.md')]
live = [p for p in posts if not p['draft'] and p['date'] and p['date'] <= TODAY]
reg = json.load(open(REGISTRY)) if os.path.exists(REGISTRY) else {'sent': []}
done = set(reg.get('sent', [])) | set(reg.get('skipped', []))
new = [p for p in live if p['slug'] not in done]
print(f'{len(live)} live posts, {len(new)} not yet emailed: {[p["slug"] for p in new]}')

git('config', 'user.name', 'Concepts publisher')
git('config', 'user.email', 'info@conceptscalicut.com')

# ---- 1. publish run ----
if EVENT in ('schedule', 'workflow_dispatch'):
    last = git('log', '-1', '--grep', r'\[publish\]', '--format=%H', check=False).stdout.strip()
    waiting = (not last) or git('diff', '--quiet', last, 'HEAD', '--', '.', f':!{REGISTRY}', check=False).returncode != 0
    force = os.environ.get('FORCE_PUBLISH', '').lower() == 'true'
    if new or waiting or force:
        git('commit', '--allow-empty', '-m', f'Publish {TODAY} [publish]')
        git('push')
        print('Pushed a [publish] commit: Netlify will deploy the site.')
    else:
        print('Nothing new to publish this week.')
    to_email = new
else:  # a post was saved in the editor with "Publish immediately"
    to_email = [p for p in new if p['publish_now']]

if not to_email:
    sys.exit(0)

key = os.environ.get('BREVO_API_KEY', '').strip()
if not key:
    print('BREVO_API_KEY is not set: these posts will not be emailed.')
    reg.setdefault('skipped', []).extend(p['slug'] for p in to_email)
else:
    # ---- 2. wait until the pages are online ----
    for p in to_email:
        url = f'{BASE}/journal/{p["slug"]}.html'
        for attempt in range(40):
            try:
                with urllib.request.urlopen(urllib.request.Request(url, headers={'Cache-Control': 'no-cache'}), timeout=20) as r:
                    if r.status == 200:
                        break
            except Exception:
                pass
            time.sleep(30)
        else:
            print('Page never came online, will retry next run:', url)
            to_email = [x for x in to_email if x is not p]
    if not to_email:
        sys.exit(0)

    # ---- 3. build and send one email for all new posts ----
    def card(p):
        img = BASE + '/' + str(p.get('image') or '/img/transformation-poster.jpg').lstrip('/')
        url = f'{BASE}/journal/{p["slug"]}.html?utm_source=newsletter&utm_medium=email&utm_campaign=blog'
        return f'''<tr><td style="padding:0 0 28px">
<a href="{url}"><img src="{html.escape(img)}" width="560" alt="" style="width:100%;max-width:560px;height:auto;display:block;border:0"></a>
<p style="margin:16px 0 4px;font:600 11px/1.4 Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;color:#B39060">{html.escape(str(p.get("category") or "Concepts Blog"))}</p>
<h2 style="margin:0 0 8px;font:400 24px/1.3 Georgia,serif;color:#16130E">{html.escape(p.get("title", ""))}</h2>
<p style="margin:0 0 16px;font:15px/1.6 Arial,sans-serif;color:#4A443B">{html.escape(str(p.get("summary") or p.get("description") or ""))}</p>
<a href="{url}" style="display:inline-block;background:#B39060;color:#16130E;padding:11px 20px;font:600 14px Arial,sans-serif;text-decoration:none">Read the Article</a>
</td></tr>'''

    subject = to_email[0].get('title', 'New on the Concepts blog')
    if len(to_email) > 1:
        subject += f' (and {len(to_email) - 1} more)'
    body = f'''<!doctype html><html><body style="margin:0;background:#F4F0E8">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F0E8"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF">
<tr><td style="background:#0D0C0A;padding:22px 20px;text-align:center"><a href="{BASE}/"><img src="{BASE}/img/logo-mark-gold.png" width="56" alt="Concepts" style="display:inline-block;border:0"></a>
<p style="margin:8px 0 0;font:600 12px Arial,sans-serif;letter-spacing:3px;color:#D4BA8E">CONCEPTS INTERIORS &amp; HOME DECOR</p></td></tr>
<tr><td style="padding:28px 20px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">{"".join(card(p) for p in to_email)}</table></td></tr>
<tr><td style="padding:0 20px 28px;font:14px/1.6 Arial,sans-serif;color:#4A443B">Planning a home or office interior? Message us on
<a href="https://wa.me/919544355406" style="color:#8A6A3A">WhatsApp +91 95443 55406</a> or visit our showroom near Kozhikode railway station.</td></tr>
<tr><td style="background:#0D0C0A;padding:18px 20px;font:12px/1.6 Arial,sans-serif;color:#A79E90;text-align:center">
Concepts Interiors &amp; Home Decor · St Patrick Church Building, near AKG Flyover, Pushpa Junction, Kozhikode 673002<br>
<a href="https://www.instagram.com/conceptscalicut" style="color:#D4BA8E">Instagram</a> · <a href="https://www.facebook.com/conceptscalicut" style="color:#D4BA8E">Facebook</a> · <a href="{BASE}/" style="color:#D4BA8E">conceptscalicut.com</a><br>
You are receiving this because you subscribed on our website. <a href="{{{{ unsubscribe }}}}" style="color:#D4BA8E">Unsubscribe</a></td></tr>
</table></td></tr></table></body></html>'''

    def brevo(path, payload=None):
        req = urllib.request.Request('https://api.brevo.com/v3' + path, method='POST',
                                     data=json.dumps(payload).encode() if payload is not None else None,
                                     headers={'api-key': key, 'accept': 'application/json', 'content-type': 'application/json'})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                txt = r.read().decode()
                return json.loads(txt) if txt else {}
        except urllib.error.HTTPError as e:
            print('Brevo error', e.code, e.read().decode())
            sys.exit(1)

    camp = brevo('/emailCampaigns', {
        'name': f'Blog {TODAY}: ' + ', '.join(p['slug'] for p in to_email),
        'subject': subject,
        'previewText': str(to_email[0].get('summary') or '')[:140],
        'sender': SENDER,
        'replyTo': SENDER['email'],
        'type': 'classic',
        'htmlContent': body,
        'recipients': {'listIds': [int(os.environ.get('BREVO_LIST_ID') or 3)]},
    })
    mode = (os.environ.get('NEWSLETTER_MODE') or 'send').lower()
    if mode == 'send':
        brevo(f'/emailCampaigns/{camp["id"]}/sendNow')
        print('Newsletter sent, campaign', camp['id'])
    else:
        print('Newsletter created as a draft in Brevo, campaign', camp['id'])
    reg.setdefault('sent', []).extend(p['slug'] for p in to_email)

json.dump(reg, open(REGISTRY, 'w'), indent=2)
git('add', REGISTRY)
git('commit', '-m', 'Newsletter record updated')
git('pull', '--rebase', '--quiet')
git('push')
