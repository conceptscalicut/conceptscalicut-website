# Loads blog posts from blog/posts/*.md (the files the /admin editor writes).
# Run from build.py with exec().
import yaml
import markdown as _md

POSTS_DIR = os.path.join(HERE, '..', 'blog', 'posts')


def _load_post(fn):
    raw = open(os.path.join(POSTS_DIR, fn), encoding='utf8').read()
    m = re.match(r'^---\s*\n(.*?)\n---\s*\n?(.*)$', raw, re.S)
    meta = (yaml.safe_load(m.group(1)) if m else {}) or {}
    body = m.group(2) if m else raw
    meta['slug'] = fn[:-3]
    d = meta.get('date') or TODAY
    if isinstance(d, datetime.datetime): d = d.date().isoformat()
    elif isinstance(d, datetime.date): d = d.isoformat()
    meta['date'] = str(d)[:10]
    meta['title'] = str(meta.get('title') or meta['slug'].replace('-', ' ').title())
    meta['body_html'] = _md.markdown(body, extensions=['extra', 'sane_lists'])
    meta['img'] = str(meta.get('image') or '/img/transformation-poster.jpg').lstrip('/')
    meta['desc'] = str(meta.get('description') or meta.get('summary') or '')
    meta['card_title'] = str(meta.get('card_title') or meta['title'])
    meta['summary'] = str(meta.get('summary') or meta['desc'])
    meta['category'] = str(meta.get('category') or 'Ideas')
    words = len(re.sub(r'<[^>]+>', ' ', meta['body_html']).split())
    meta['mins'] = int(meta.get('read_time') or 0) or max(2, round(words / 200))
    return meta


ALL_POSTS = [_load_post(f) for f in sorted(os.listdir(POSTS_DIR)) if f.endswith('.md')]
# Drafts and future-dated posts stay hidden until their publish date.
POSTS = sorted([p for p in ALL_POSTS if not p.get('draft') and p['date'] <= TODAY],
               key=lambda p: (p['date'], p['slug']), reverse=True)


def post_card(p, prefix=''):
    pos = f' style="object-position:{esc(p["image_position"])}"' if p.get('image_position') else ''
    return (f'<a class="post" href="{prefix}journal/{p["slug"]}.html"><span class="ph"><img src="{prefix}{esc(p["img"])}" alt="" loading="lazy"{pos}></span>'
            f'<span class="meta">{esc(tc(p["category"]))} · {p["mins"]} min read</span>'
            f'<h3>{esc(tc(p["card_title"]))}</h3><p>{esc(p["summary"])}</p></a>')


# Homepage blog cards (English and Malayalam pages): latest six posts.
src = re.sub(r'(<div class="posts">)[\s\S]*?(\n    </div>)',
             lambda m: m.group(1) + '\n      ' + '\n      '.join(post_card(p) for p in POSTS[:6]) + m.group(2), src, count=1)
