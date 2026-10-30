# Blog pages: one page per post in blog/posts/*.md, plus the blog index at /journal/.
# Run from build.py with exec(), so it shares build.py's helpers (page, crumbs, aside, esc, SERVICES, POSTS ...).

os.makedirs(os.path.join(DIST, 'journal'), exist_ok=True)


def sub_box(source, heading='Enjoyed This? Get the Next One by Email'):
    return (
        '<div class="follow" id="subscribe"><div><p class="eyebrow">Stay Updated</p>'
        f'<h3>{heading}</h3><p class="lede">One email when a new post or showroom arrival goes up, '
        'or follow Concepts where you already spend time.</p>'
        '<form class="sub" name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field">'
        '<input type="hidden" name="form-name" value="newsletter">'
        f'<input type="hidden" name="source" value="{esc(source)}">'
        '<p hidden><label>Leave this empty <input name="bot-field"></label></p>'
        '<label class="vh" for="subEmail">Email address</label>'
        '<div class="sub-row"><input id="subEmail" type="email" name="email" required autocomplete="email" placeholder="Your email address">'
        '<button class="btn btn-gold btn-sm" type="submit">Subscribe</button></div>'
        '<p class="sub-note">No spam; unsubscribe any time.</p>'
        '<p class="sub-ok" role="status" hidden>Almost done! Check your inbox and tap the confirmation link to join the list.</p></form></div>'
        '<div class="social"><p class="sub-note">Or follow us</p>'
        '<a class="btn btn-ghost btn-sm" href="https://www.instagram.com/conceptscalicut" target="_blank" rel="noopener">Follow on Instagram</a>'
        '<a class="btn btn-ghost btn-sm" href="https://www.facebook.com/conceptscalicut" target="_blank" rel="noopener">Follow on Facebook</a>'
        '<a class="btn btn-ghost btn-sm" href="https://whatsapp.com/channel/0029Vagc6QdAYlUFE0jaHE2u" target="_blank" rel="noopener">Join Our WhatsApp Channel</a></div></div>'
    )


def yt_id(u):
    m = re.search(r'(?:youtu\.be/|[?&]v=|shorts/|embed/|live/)([\w-]{11})', str(u or ''))
    return m.group(1) if m else None


ORG = {"@id": BUSINESS_ID, "@type": "Organization", "name": "Concepts Interiors & Home Decor",
       "logo": {"@type": "ImageObject", "url": BASE + "/img/logo-mark-gold.png"}}

for p in POSTS:
    path = f"/journal/{p['slug']}.html"
    vid_html, vid_schema = '', []
    vid = yt_id(p.get('video'))
    if vid:
        vid_html = (f'<div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/{vid}" title="{esc(p["title"])}" loading="lazy" '
                    'allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>')
        vid_schema = [{"@context": "https://schema.org", "@type": "VideoObject", "name": p['title'],
                       "description": p['desc'] or p['title'], "thumbnailUrl": f"https://i.ytimg.com/vi/{vid}/hqdefault.jpg",
                       "uploadDate": p['date'], "embedUrl": f"https://www.youtube.com/embed/{vid}",
                       "contentUrl": f"https://www.youtube.com/watch?v={vid}"}]
    svc = next((s for s in SERVICES if s['slug'] == p.get('related_service')), None)
    related = f'<p>Related service: <a class="link" href="../services/{svc["slug"]}.html">{esc(svc["h1"])}</a></p>' if svc else ''
    others = ''.join(f'<a href="{o["slug"]}.html">{esc(o["title"])}</a>' for o in [o for o in POSTS if o is not p][:8])
    pos = f';object-position:{esc(p["image_position"])}' if p.get('image_position') else ''
    nice_date = datetime.date.fromisoformat(p["date"]).strftime("%d %B %Y")
    body = (
        '<section class="phero"><div class="wrap">\n  '
        + crumbs([("Home", "../"), ("Blog", "./"), (p["title"], None)]) +
        '\n</div></section>\n<section class="block" style="padding-top:20px"><div class="wrap cols">\n'
        f'  <article class="prose"><img src="../{esc(p["img"])}" alt="{esc(p["title"])}" style="width:100%;aspect-ratio:2/1;object-fit:cover;margin-bottom:10px{pos}">\n'
        f'    <p class="eyebrow">{esc(p["category"])} · Concepts Blog</p><h1>{esc(p["title"])}</h1>\n'
        f'    {vid_html}{p["body_html"]}\n'
        f'    <p style="color:var(--faint);font-size:.85rem">By the Concepts team, Kozhikode · <time datetime="{p["date"]}">{nice_date}</time></p>\n'
        f'    {related}\n    {sub_box("blog: " + p["slug"])}</article>\n'
        f'  {aside("Hi Concepts, I read " + chr(39) + p["title"] + chr(39) + " and have a question.")}\n'
        '</div></section>\n'
        f'<section class="block tone"><div class="wrap"><p class="eyebrow">More from the Blog</p><div class="links" style="margin-top:16px">{others}<a href="./">All Blog Posts</a></div></div></section>'
    )
    schema = [
        {"@context": "https://schema.org", "@type": "BlogPosting", "headline": p['title'], "description": p['desc'],
         "image": BASE + '/' + p['img'], "datePublished": p["date"], "dateModified": p["date"], "inLanguage": "en",
         "mainEntityOfPage": BASE + path,
         "author": {"@type": "Organization", "name": "Concepts Interiors & Home Decor", "url": BASE + "/"}, "publisher": ORG},
        crumb_schema([("Home", BASE + "/"), ("Blog", BASE + "/journal/"), (p['title'], BASE + path)]),
    ] + vid_schema
    open(os.path.join(DIST, 'journal', p['slug'] + '.html'), 'w', encoding='utf8').write(
        page(path, p['title'] + ' | Concepts, Kozhikode', p['desc'], body, schema, p['img'], p['slug'], og_type='article'))
    URLS.append((path, 0.6))

# ---------- blog index ----------
path = '/journal/'
body = (
    '<section class="phero"><div class="wrap">\n  ' + crumbs([("Home", "../"), ("Blog", None)]) +
    '\n  <p class="eyebrow">Concepts Blog</p><h1>Ideas and Advice for Kerala Homes</h1>\n'
    '  <p class="lede">Practical notes on materials, finishes, decor and planning from our design team and showroom in Kozhikode.</p>\n'
    '</div></section>\n<section class="block" style="padding-top:10px"><div class="wrap">'
    f'<div class="posts">{"".join(post_card(p, "../") for p in POSTS)}</div>\n'
    f'<div style="margin-top:clamp(36px,5vw,56px)"></div>{sub_box("blog index", "Get Every New Post by Email")}</div></section>'
)
schema = [{"@context": "https://schema.org", "@type": "Blog", "name": "Concepts Blog", "url": BASE + path, "publisher": ORG,
           "blogPost": [{"@type": "BlogPosting", "headline": p['title'], "url": f"{BASE}/journal/{p['slug']}.html",
                         "datePublished": p['date']} for p in POSTS]},
          crumb_schema([("Home", BASE + "/"), ("Blog", BASE + path)])]
open(os.path.join(DIST, 'journal', 'index.html'), 'w', encoding='utf8').write(
    page(path, 'Concepts Blog: Interior and Decor Ideas | Kozhikode',
         'Practical interior design and home decor advice for Kerala homes from Concepts, Kozhikode: materials, humidity, finishes, mirrors, flooring and more.',
         body, schema, POSTS[0]['img'] if POSTS else 'img/transformation-poster.jpg', 'blog'))
URLS.append((path, 0.7))
