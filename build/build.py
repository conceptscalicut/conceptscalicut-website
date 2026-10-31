"""Builds the deployable Concepts website from the source in ../site into ../dist.
Run: python3 build.py
"""
import json, os, re, shutil, subprocess, html, datetime
from PIL import Image
from pages import SERVICES
from titlecase import tc_doc, tc

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'site')
DIST = os.path.join(HERE, '..', 'dist')
BASE = 'https://www.conceptscalicut.com'
TODAY = (datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None) + datetime.timedelta(hours=5, minutes=30)).date().isoformat()  # India time

# ---------- load sources ----------
site = json.loads(subprocess.check_output(['node', '-e', "const vm=require('vm');const w={};vm.runInNewContext(require('fs').readFileSync(process.argv[1],'utf8'),{window:w});console.log(JSON.stringify(w.SITE))", os.path.join(SRC, 'content.js')]))
src = open(os.path.join(SRC, 'index.html'), encoding='utf8').read()
C = site['contact']; G = site['google']
esc = lambda t: html.escape(str(t), quote=True)
exec(open(os.path.join(HERE, 'blog_loader.py'), encoding='utf8').read())

if os.path.exists(DIST): shutil.rmtree(DIST)
os.makedirs(DIST)
for d in ('img', 'media'):
    shutil.copytree(os.path.join(SRC, d), os.path.join(DIST, d))
shutil.copy(os.path.join(SRC, 'content.js'), DIST)
if os.path.isdir(os.path.join(HERE, '..', 'admin')):
    shutil.copytree(os.path.join(HERE, '..', 'admin'), os.path.join(DIST, 'admin'))
# photos uploaded through the blog editor can be large phone images: shrink them for the web
_bdir = os.path.join(DIST, 'img', 'blog')
for _f in (os.listdir(_bdir) if os.path.isdir(_bdir) else []):
    _fp = os.path.join(_bdir, _f)
    try:
        _im = Image.open(_fp)
        if _im.width > 1600 or os.path.getsize(_fp) > 450000:
            _im.thumbnail((1600, 1600))
            if _f.lower().endswith(('.jpg', '.jpeg')): _im.convert('RGB').save(_fp, quality=80, optimize=True, progressive=True)
            elif _f.lower().endswith('.png'): _im.save(_fp, optimize=True)
            elif _f.lower().endswith('.webp'): _im.save(_fp, quality=80)
    except Exception as _e: print('image skipped', _f, _e)
# The full-quality home film lives on a separate Netlify project (conceptscalicut-media) so each upload stays small.
MEDIA = os.path.join(HERE, '..', 'media-dist')
if os.path.exists(MEDIA): shutil.rmtree(MEDIA)
os.makedirs(MEDIA)
shutil.move(os.path.join(DIST, 'media', 'transformation.mp4'), os.path.join(MEDIA, 'transformation.mp4'))
open(os.path.join(MEDIA, '_headers'), 'w').write('/*\n  Access-Control-Allow-Origin: *\n  Cache-Control: public, max-age=2592000\n  X-Robots-Tag: noindex\n')
open(os.path.join(MEDIA, 'robots.txt'), 'w').write('User-agent: *\nDisallow: /\n')
open(os.path.join(MEDIA, 'index.html'), 'w').write('<!doctype html><meta charset=utf-8><meta name=robots content=noindex><title>Concepts media</title><p>Media files for <a href="https://www.conceptscalicut.com/">conceptscalicut.com</a></p>')

# image sizes for width/height attributes (prevents layout shift)
SIZES = {}
for f in os.listdir(os.path.join(SRC, 'img')):
    try: SIZES['img/' + f] = Image.open(os.path.join(SRC, 'img', f)).size
    except Exception: pass
def add_dims(h, prefix=''):
    def fix(m):
        tag = m.group(0)
        if ' width=' in tag: return tag
        src_ = re.search(r'src="([^"]+)"', tag).group(1).replace(prefix, '', 1)
        if src_ in SIZES:
            w, hgt = SIZES[src_]; return tag[:-1] + f' width="{w}" height="{hgt}">'
        return tag
    return re.sub(r'<img [^>]*src="[^"]+"[^>]*>', fix, h)

# ---------- shared schema ----------
BUSINESS_ID = BASE + '/#business'
business = {
  "@context":"https://schema.org",
  "@type":["HomeAndConstructionBusiness","HomeGoodsStore"],
  "@id":BUSINESS_ID,
  "name":"Concepts Interiors & Home Decor",
  "alternateName":["Concepts Enterprises","Concepts Calicut","Conceptscalicut"],
  "description":"Interior design, build and home decor company in Kozhikode (Calicut), Kerala, focused on the Malabar region and central Kerala. Residential, commercial, healthcare and hospitality interiors, modular kitchens, wardrobes, bathrooms, vertical gardens and 3D design, plus a showroom 500 m from Kozhikode railway station for interior and decor products: wallpapers, wall panels, louvers, curtains, flooring, mirrors, curios, calligraphy, plants and frames.",
  "url":BASE + "/",
  "logo":BASE + "/img/logo-mark-gold.png",
  "image":[BASE + "/img/transformation-poster.jpg", BASE + "/img/bedroom-teak.jpg", BASE + "/img/kitchen-gloss.jpg"],
  "telephone":"+91-95443-55406",
  "email":C['email'],
  "foundingDate":"2020",
  "address":{"@type":"PostalAddress","streetAddress":"St Patrick Church Building, near AKG Flyover, Pushpa Junction, Chalappuram","addressLocality":"Kozhikode","addressRegion":"Kerala","postalCode":"673002","addressCountry":"IN"},
  "geo":{"@type":"GeoCoordinates","latitude":11.242428,"longitude":75.7844475},
  "hasMap":C['googleProfile'],
  "openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"opens":"09:30","closes":"19:30"}],
  "areaServed":[{"@type":"City","name":"Kozhikode"},{"@type":"AdministrativeArea","name":"Malabar region, Kerala"},{"@type":"AdministrativeArea","name":"Central Kerala"},{"@type":"State","name":"Kerala"}],
  "hasOfferCatalog":{"@type":"OfferCatalog","name":"Interior and decor products","url":BASE+"/products.html","itemListElement":[{"@type":"OfferCatalog","name":c["name"],"itemListElement":[{"@type":"Offer","itemOffered":{"@type":"Product","name":g["name"],"description":g["text"]}} for g in c["groups"]]} for c in site.get("catalog",[])]},
  "knowsLanguage":["en","ml"],
  "aggregateRating":{"@type":"AggregateRating","ratingValue":str(G['rating']),"reviewCount":str(G['count']),"bestRating":"5"},
  "sameAs":[C['facebook'], C['instagram'], C['whatsappChannel'], C['googleProfile']],
  "contactPoint":[{"@type":"ContactPoint","telephone":"+91-95443-55406","contactType":"customer service","availableLanguage":["English","Malayalam"]}],
  "makesOffer":[{"@type":"Offer","itemOffered":{"@type":"Service","name":s['h1'],"url":f"{BASE}/services/{s['slug']}.html"}} for s in SERVICES]
}
website = {"@context":"https://schema.org","@type":"WebSite","@id":BASE+"/#website","url":BASE+"/","name":"Concepts Interiors & Home Decor","inLanguage":["en","ml"],"publisher":{"@id":BUSINESS_ID}}
def ld(obj): return '<script type="application/ld+json">' + json.dumps(obj, ensure_ascii=False) + '</script>'

# ---------- prerender dynamic homepage sections (so crawlers and AI tools see real content) ----------
CATS_ML = {'Bedrooms':'ബെഡ്റൂം','Kitchens':'കിച്ചൻ','Living':'ലിവിംഗ്','Bathrooms':'ബാത്ത്റൂം','Commercial':'കൊമേഴ്സ്യൽ','Green & outdoor':'ഗ്രീൻ & ഔട്ട്ഡോർ','3D design':'3D ഡിസൈൻ'}
DAYS_ML = {'Monday – Saturday':'തിങ്കൾ – ശനി','Sunday':'ഞായർ','Closed':'അവധി','9:30 am – 7:30 pm':'രാവിലെ 9:30 – രാത്രി 7:30'}
def pick(o, f, ml): return (o.get(f + '_ml') if ml else None) or o.get(f, '')
def prerender(h, ml):
    P = site['projects']
    def fill(idattr, inner):
        nonlocal h
        pat = re.compile(r'(<[^>]*id="' + idattr + r'"[^>]*>)(</\w+>)')
        assert pat.search(h), idattr
        h = pat.sub(lambda m: m.group(1) + inner + m.group(2), h, count=1)
    chaps = site['heroVideo']['chapters']
    fill('chapters', ''.join(f'<button class="chap" data-i="{i}"><span class="bar"><i></i></span><b>{i+1:02d} · {esc(pick(c,"label",ml))}</b><span>{esc(pick(c,"note",ml))}</span></button>' for i, c in enumerate(chaps)))
    cats = ['All'] + list(dict.fromkeys(p['category'] for p in P))
    fill('chips', ''.join(f'<button class="chip" aria-pressed="{str(c=="All").lower()}" data-c="{esc(c)}">{esc(("എല്ലാം" if ml else "All") if c=="All" else (CATS_ML.get(c,c) if ml else c))}<span>{len(P) if c=="All" else sum(1 for p in P if p["category"]==c)}</span></button>' for c in cats))
    fill('gallery', ''.join(f'<button class="shot" data-i="{i}" aria-label="{esc(p["title"])}"><img src="{esc(p["img"])}" alt="{esc(p["title"])}" loading="lazy"><figcaption><b>{esc(p["title"])}</b><i>{esc(CATS_ML.get(p["category"],p["category"]) if ml else p["category"])} · {esc(p.get("detail",""))}</i></figcaption></button>' for i, p in enumerate(P[:12])))
    f = site.get('featured')
    if f:
        hl = (f.get('highlights_ml') if ml else None) or f.get('highlights', [])
        pics = f'<div class="pics{"" if f.get("img2") else " one"}"><img src="{esc(f["img"])}" alt="{esc(pick(f,"title",ml))}" loading="lazy">' + (f'<img src="{esc(f["img2"])}" alt="" loading="lazy">' if f.get('img2') else '') + '</div>'
        fill('featured', pics + f'<div class="info"><span class="badge">{esc(pick(f,"badge",ml))}</span><h3>{esc(pick(f,"title",ml))}</h3><p>{esc(pick(f,"text",ml))}</p><ul>' + ''.join(f'<li>{esc(h)}</li>' for h in hl) + f'</ul><div class="row"><a class="btn btn-gold btn-sm" href="https://wa.me/{C["whatsapp"]}" target="_blank" rel="noopener"><svg><use href="#i-wa"/></svg>{"WhatsApp-ൽ അന്വേഷിക്കാം" if ml else "Enquire on WhatsApp"}</a><a class="btn btn-ghost btn-sm" href="products.html#{esc(f.get("group",""))}">{"മുഴുവൻ ശേഖരം കാണാം" if ml else "See the full range"}</a></div></div>')
    fill('collections', ''.join(f'<a class="coll" href="products.html#{esc(c["id"])}"><div class="ph"><img src="{esc(c["cover"])}" alt="{esc(pick(c,"name",ml))}" loading="lazy"></div><div class="body"><p class="eyebrow">{"കളക്ഷൻ" if ml else "Collection"}</p><h3>{esc(pick(c,"name",ml))}</h3><p>{esc(pick(c,"intro",ml))}</p><div class="groups">' + ''.join(f'<span>{esc(pick(g,"name",ml))}</span>' for g in c['groups']) + f'</div><span class="go">{"ഉൽപ്പന്നങ്ങൾ കാണാം" if ml else "View products"} →</span></div></a>' for c in site.get('catalog', [])))
    fill('rvTrack', ''.join(f'<article class="rv"><span class="stars" aria-label="{r["stars"]} / 5">{"★"*r["stars"]}</span><q>{esc(r["text"])}</q><footer><b>{esc(r["name"])}</b><span>{"Google റിവ്യൂ" if ml else "Google review"}</span></footer></article>' for r in site['reviews']))
    fill('hours', ''.join(f'<span>{esc(DAYS_ML.get(a,a) if ml else a)}</span><span>{esc(DAYS_ML.get(b,b) if ml else b)}</span>' for a, b in C['hours']))
    return h

def apply_ml(h, ML):
    """Server-render Malayalam into data-t elements, keeping English in data-en so the switch still works."""
    out = []; pos = 0
    for m in re.finditer(r'<(\w+)([^>]*?) data-t="(\w+)"([^>]*)>', h):
        tag, key = m.group(1), m.group(3)
        if key not in ML: continue
        start = m.end()
        # find matching close tag (handles nesting of same tag)
        depth, k = 1, start
        while depth:
            o = h.find('<' + tag, k); c = h.find('</' + tag + '>', k)
            if o != -1 and o < c and re.match(r'<' + tag + r'[\s>]', h[o:o+len(tag)+2]): depth += 1; k = o + 1
            else: depth -= 1; k = c + 1
        end = c
        if start < pos: continue  # nested inside an element already replaced
        inner = h[start:end]
        out.append(h[pos:m.start()]); out.append(h[m.start():m.end()-1] + f' data-en="{esc(inner)}">' + ML[key]); pos = end
    out.append(h[pos:])
    h = ''.join(out)
    h = re.sub(r'placeholder="([^"]*)" data-iph="([^"]*)"', lambda m: f'placeholder="{m.group(2)}" data-enph="{m.group(1)}" data-iph="{m.group(2)}"', h)
    return h

def split_fragment(frag):
    i = frag.index('<svg width="0"')
    return frag[:i], frag[i:]

def head_common(title, desc, path, image=BASE + '/img/transformation-poster.jpg', lang='en', og_type='website', alternates=None):
    url = BASE + path
    alt = ''
    if alternates:
        alt = ''.join(f'<link rel="alternate" hreflang="{l}" href="{BASE+p}">' for l, p in alternates)
    return f'''<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="{url}">
{alt}
<meta name="theme-color" content="#0D0C0A">
<meta name="format-detection" content="telephone=yes">
<meta name="geo.region" content="IN-KL"><meta name="geo.placename" content="Kozhikode"><meta name="geo.position" content="11.242428;75.7844475"><meta name="ICBM" content="11.242428, 75.7844475">
<meta property="og:site_name" content="Concepts Interiors &amp; Home Decor">
<meta property="og:type" content="{og_type}">
<link rel="alternate" type="application/rss+xml" title="Concepts Blog" href="{BASE}/feed.xml">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{image}">
<meta property="og:locale" content="{'ml_IN' if lang=='ml' else 'en_IN'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(title)}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{image}">
<link rel="icon" type="image/png" href="/img/favicon.png">
<link rel="apple-touch-icon" href="/img/favicon.png">
<link rel="manifest" href="/site.webmanifest">
'''

# ---------- homepage (English + Malayalam) ----------
i = src.index('const ML = ') + len('const ML = '); j = src.index(';\nconst UI', i)
ML = json.loads(src[i:j])

FAQ_SCHEMA = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}
for m in re.finditer(r'<summary data-t="\w+">(.*?)</summary><p data-t="\w+">(.*?)</p>', src):
    FAQ_SCHEMA['mainEntity'].append({"@type":"Question","name":html.unescape(m.group(1)),"acceptedAnswer":{"@type":"Answer","text":html.unescape(m.group(2))}})

HOME = {
 'en': dict(path='/', title='Interior Designers in Kozhikode (Calicut) | Concepts Interiors & Home Decor',
            desc='Interior designers in Kozhikode for residential, commercial and hospitality spaces. Interior and decor products showroom near the railway station. Free site visit within Calicut city. Rated 4.9 on Google.'),
 'ml': dict(path='/ml.html', title='കോഴിക്കോട്ടെ ഇന്റീരിയർ ഡിസൈനർമാർ | Concepts Interiors & Home Decor',
            desc='കോഴിക്കോട്ടെ റെസിഡൻഷ്യൽ, കൊമേഴ്സ്യൽ, ഹോസ്പിറ്റാലിറ്റി ഇടങ്ങൾക്കായി ഇന്റീരിയർ ഡിസൈൻ. മോഡുലാർ കിച്ചൻ, വാൾപേപ്പർ, LED മിറർ, LVT ഫ്ലോറിംഗ്. നഗരപരിധിയിൽ സൗജന്യ സൈറ്റ് വിസിറ്റ്. Google-ൽ 4.9 റേറ്റിംഗ്.'),
}
ALTS = [('en','/'),('ml','/ml.html'),('x-default','/')]
built_fragment = None
for lang in ('en', 'ml'):
    frag = prerender(src, lang == 'ml')
    if lang == 'ml': frag = apply_ml(frag, ML)
    head, body = split_fragment(frag)
    if lang == 'en': built_fragment = frag  # for the preview artifact
    # drop the fragment's own title/meta/og/icon/ld+json; rebuild them properly
    head = re.sub(r'<title>.*?</title>\n?', '', head)
    head = re.sub(r'<meta (name|property)="(description|theme-color|og:[^"]+)"[^>]*>\n?', '', head)
    head = re.sub(r'<link rel="icon"[^>]*>\n?', '', head)
    head = re.sub(r'<script type="application/ld\+json">.*?</script>\n?', '', head, flags=re.S)
    H = HOME[lang]
    head = head_common(H['title'], H['desc'], H['path'], lang=lang, alternates=ALTS) + \
        '<link rel="preload" as="image" href="img/hero-bedroom-poster.jpg">\n' + \
        ld(business) + '\n' + ld(website) + '\n' + ld(FAQ_SCHEMA) + '\n' + head
    body = add_dims(body)
    attrs = f' lang="{lang}"' + (' data-page-lang="ml"' if lang == 'ml' else '')
    doc = f'<!doctype html>\n<html{attrs}>\n<head>\n{head}</head>\n<body>\n{body}\n</body>\n</html>\n'
    open(os.path.join(DIST, 'index.html' if lang == 'en' else 'ml.html'), 'w', encoding='utf8').write(doc)
open(os.path.join(HERE, '..', 'preview-index.html'), 'w', encoding='utf8').write(add_dims(built_fragment))

# ---------- shared CSS + small script for inner pages ----------
css = re.search(r'<style>(.*?)</style>', src, re.S).group(1)
css += open(os.path.join(HERE, 'products_css.txt'), encoding='utf8').read() + '''
/* Inner pages */
.top{background:color-mix(in srgb,var(--bg) 94%,transparent);border-color:var(--line-soft)}
.crumbs{font-size:.8rem;color:var(--faint);display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px}
.crumbs a{color:var(--muted);text-decoration:none}.crumbs a:hover{color:var(--gold)}
.phero{padding-block:130px 0}
.phero .grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:clamp(28px,5vw,64px);align-items:end}
.phero h1{font-size:clamp(2.1rem,4.6vw,3.8rem);margin-block:14px 18px}
.phero img{width:100%;aspect-ratio:4/3;object-fit:cover}
.prose{max-width:70ch;display:grid;gap:16px}
.prose p,.prose li{color:color-mix(in srgb,var(--ink) 86%,transparent);font-weight:300;font-size:1.05rem}
.prose strong{color:var(--ink);font-weight:500}
.prose h2{font-size:clamp(1.5rem,2.6vw,2rem);margin-top:22px}
.prose h3{color:var(--gold);font-size:1.25rem;margin-top:14px}
.prose ul{margin:0;padding-left:1.2em;display:grid;gap:8px}
.cols{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:clamp(32px,6vw,80px);align-items:start}
.aside{position:sticky;top:100px;border:1px solid color-mix(in srgb,var(--gold) 35%,transparent);padding:24px;display:grid;gap:14px}
.aside .btn{justify-content:center}
.aside p{color:var(--muted);font-size:.92rem}
.pgrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:20px}
.pgrid img{width:100%;aspect-ratio:4/3;object-fit:cover}
.links{display:flex;flex-wrap:wrap;gap:10px}
.links a{border:1px solid var(--line);padding:.55em .9em;text-decoration:none;font-size:.88rem;color:var(--muted)}
.links a:hover{color:var(--gold);border-color:var(--gold)}
@media (max-width:860px){.phero .grid,.cols{grid-template-columns:1fr}.aside{position:static}.pgrid{grid-template-columns:repeat(2,minmax(0,1fr))}}
'''
os.makedirs(os.path.join(DIST, 'assets'), exist_ok=True)
open(os.path.join(DIST, 'assets', 'site.css'), 'w', encoding='utf8').write(css)
open(os.path.join(DIST, 'assets', 'page.js'), 'w', encoding='utf8').write(r'''function toBrevo(f){try{var b=new FormData();b.append('EMAIL',f.email.value);b.append('email_address_check','');b.append('locale','en');b.append('html_type','simple');fetch('https://849c43ba.sibforms.com/serve/MUIFAOn_XgMTpekZm7AOYBc4bGraVsh1ZAD024hpJ_1as1GIt86E3Vl-vIS6zHoSKnmhARktYgUmgYz_tas7l0Sdt1vrvj52Ilp8NxIwpbIZLJAZoCoIRAdncY0Meil28DauY4B9Wd_Dav9fU1IZ78bA_chP04c4DldZPoOBuISMXOw4UXVU-s1NeNAdIiPZUZwL5E_Lwc8X0ie0rA',{method:'POST',mode:'no-cors',body:b})}catch(_){}}
document.querySelectorAll('form.sub').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();toBrevo(f);fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(f)).toString()}).then(function(r){if(!r.ok)throw 0;f.querySelector('.sub-ok').hidden=false;f.querySelector('.sub-row').hidden=true;try{gtag('event','newsletter_signup',{source:f.source.value})}catch(_){}}).catch(function(){f.submit()})})});
(function(){
const S = window.SITE || {}, C = S.contact || {};
const WA = C.whatsapp || '919544355406';
document.querySelectorAll('a.wa').forEach(a => { a.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(a.dataset.msg || 'Hi Concepts!'); a.target = '_blank'; a.rel = 'noopener'; });
const nav = document.getElementById('nav'), btn = document.getElementById('menuBtn');
if (btn) btn.onclick = () => { const o = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', o); };
const GA = String((S.analytics || {}).ga4 || '').trim();
const live = /(^|\.)conceptscalicut\.com$/.test(location.hostname) || /\.netlify\.app$/.test(location.hostname);
let track = () => {};
if (/^G-[A-Z0-9]+$/.test(GA) && live) {
  const sc = document.createElement('script'); sc.async = true; sc.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA; document.head.appendChild(sc);
  window.dataLayer = window.dataLayer || []; window.gtag = function(){ dataLayer.push(arguments); }; gtag('js', new Date()); gtag('config', GA);
  track = (n, p) => { try { gtag('event', n, p || {}); } catch(_){} };
}
document.addEventListener('click', e => { const a = e.target.closest('a'); if (!a) return; const h = a.getAttribute('href') || '', where = document.body.dataset.page || 'page';
  if (h.includes('wa.me/')) track('whatsapp_click', {link_location: where});
  else if (h.startsWith('tel:')) track('phone_click', {link_location: where});
  else if (h.startsWith('mailto:')) track('email_click', {link_location: where});
  else if (h.includes('writereview')) track('review_click', {link_location: where}); }, true);
})();''')

SVG = src[src.index('<svg width="0"'):src.index('</svg>', src.index('<symbol id="i-g"')) + 6]
def header(prefix):
    return f'''<header class="top solid" id="top"><div class="wrap">
  <a class="brand" href="{prefix}" aria-label="Concepts home"><img src="{prefix}img/logo-mark-gold.png" alt="" width="68" height="43"><span><b>CONCEPTS</b><small>Interiors &amp; Home Decor</small></span></a>
  <nav class="nav" id="nav" aria-label="Main"><a href="{prefix}#about">About</a><a href="{prefix}#services">Services</a><div class="dd"><a href="{prefix}products.html">Products</a><div class="dd-menu"><a href="{prefix}products.html#interior">Interior products</a><a href="{prefix}products.html#decor">Decor products</a><a href="{prefix}products.html#appliances">Home appliances</a></div></div><a href="{prefix}#projects">Projects</a><a href="{prefix}#reviews">Reviews</a><a href="{prefix}journal/">Blog</a><a href="{prefix}#contact">Contact</a></nav>
  <a class="lang" href="{prefix}ml.html" lang="ml" style="text-decoration:none">മലയാളം</a>
  <a class="btn btn-gold btn-sm wa" data-msg="Hi Concepts, I'd like to talk about an interior project." href="https://wa.me/{C['whatsapp']}"><svg><use href="#i-wa"/></svg><span>WhatsApp</span></a>
  <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="nav">MENU</button>
</div></header>'''
def footer(prefix):
    svc = ''.join(f'<li><a href="{prefix}services/{s["slug"]}.html">{esc(s["nav"])}</a></li>' for s in SERVICES)
    return f'''<footer class="site"><div class="wrap">
  <div><a class="brand" href="{prefix}"><img src="{prefix}img/logo-mark-gold.png" alt="" width="68" height="43"><span><b>CONCEPTS</b><small>Interiors &amp; Home Decor</small></span></a>
  <p style="margin-top:16px;max-width:44ch">Concepts Enterprises. Interior design studio and home decor showroom in the heart of Calicut, 500 m from the railway station: St Patrick Church Building, near AKG Flyover, Pushpa Junction, Kozhikode, Kerala 673002.</p></div>
  <div><h4>Services</h4><ul>{svc}</ul></div>
  <div><h4>Explore</h4><ul><li><a href="{prefix}#about">About us</a></li><li><a href="{prefix}products.html">Products</a></li><li><a href="{prefix}#projects">Projects</a></li><li><a href="{prefix}#reviews">Reviews</a></li><li><a href="{prefix}#faq">FAQ</a></li><li><a href="{prefix}journal/">Blog</a></li></ul></div>
  <div><h4>Reach us</h4><ul><li><a class="wa" href="https://wa.me/{C['whatsapp']}">WhatsApp {esc(C['phoneDisplay'])}</a></li><li><a href="tel:{C['phoneLink']}">Call {esc(C['phoneDisplay'])}</a></li><li><a href="mailto:{C['email']}">{C['email']}</a></li><li><a href="{C['instagram']}" target="_blank" rel="noopener">Instagram @conceptscalicut</a></li><li><a href="{C['facebook']}" target="_blank" rel="noopener">Facebook /conceptscalicut</a></li><li><a href="{C['reviewLink']}" target="_blank" rel="noopener">Review us on Google</a></li><li><a href="https://whatsapp.com/channel/0029Vagc6QdAYlUFE0jaHE2u" target="_blank" rel="noopener">WhatsApp Channel</a></li></ul></div>
  <p class="legal">© {datetime.date.today().year} Concepts Enterprises, Kozhikode · <a href="{BASE}/">www.conceptscalicut.com</a></p>
</div></footer>
<div class="fabs"><a class="fab-wa wa" data-msg="Hi Concepts, I found you on your website and would like to know more." href="https://wa.me/{C['whatsapp']}" aria-label="Chat with Concepts on WhatsApp"><svg><use href="#i-wa"/></svg></a></div>'''

def aside(msg):
    return f'''<aside class="aside">
  <p class="eyebrow">Start with a one-to-one meeting</p>
  <h2 style="font-size:1.5rem">Talk to our team</h2>
  <p>Send a few photos or a floor plan and we will reply with the right next step. Site visits are free within Calicut city.</p>
  <a class="btn btn-gold wa" data-msg="{esc(msg)}" href="https://wa.me/{C['whatsapp']}"><svg><use href="#i-wa"/></svg>WhatsApp {esc(C['phoneDisplay'])}</a>
  <a class="btn btn-ghost" href="tel:{C['phoneLink']}">Call {esc(C['phoneDisplay'])}</a>
  <a class="btn btn-ghost" href="mailto:{C['email']}"><svg><use href="#i-mail"/></svg>{C['email']}</a>
  <p><span class="stars">★★★★★</span> {G['rating']} on Google from {G['count']} reviews</p>
  <p>Showroom: heart of Calicut, 500 m from the railway station. Mon–Sat 9:30 am – 7:30 pm.</p>
</aside>'''

def page(path, title, desc, body, schema, image, page_id, prefix='../', og_type='website'):
    doc = f'''<!doctype html>
<html lang="en">
<head>
{head_common(title, desc, path, image=BASE + '/' + image, og_type=og_type)}<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Marcellus&family=Jost:wght@300;400;500;600&family=Noto+Sans+Malayalam:wght@400;500&display=swap">
<link rel="stylesheet" href="{prefix}assets/site.css">
{''.join(ld(s) + chr(10) for s in schema)}<script src="{prefix}content.js"></script>
</head>
<body data-page="{page_id}">
{SVG}
{header(prefix)}
<main>
{body}
</main>
{footer(prefix)}
<script src="{prefix}assets/page.js"></script>
</body>
</html>
'''
    return add_dims(tc_doc(doc), prefix)

def crumbs(items):
    lis = ' <span>/</span> '.join(f'<a href="{u}">{esc(n)}</a>' if u else f'<span>{esc(n)}</span>' for n, u in items)
    return f'<nav class="crumbs" aria-label="Breadcrumb">{lis}</nav>'
def crumb_schema(items):
    return {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":i+1,"name":n,"item":u} for i,(n,u) in enumerate(items)]}

# ---------- service pages ----------
os.makedirs(os.path.join(DIST, 'services'), exist_ok=True)
URLS = [('/', 1.0), ('/ml.html', 0.9)]
for s in SERVICES:
    path = f"/services/{s['slug']}.html"
    others = ''.join(f'<a href="{o["slug"]}.html">{esc(o["nav"])}</a>' for o in SERVICES if o is not s)
    photos = ''.join(f'<img src="../{p}" alt="{esc(s["nav"])} by Concepts, Kozhikode" loading="lazy">' for p in s['photos'][:6])
    faqs = ''.join(f'<details class="qa"><summary>{esc(q)}</summary><p>{esc(a)}</p></details>' for q, a in s['faqs'])
    body = f'''<section class="phero"><div class="wrap">
  {crumbs([("Home","../"),("Services","../#services"),(s["nav"],None)])}
  <div class="grid">
    <div><p class="eyebrow">{esc(s["eyebrow"])}</p><h1>{esc(s["h1"])}</h1><p class="lede">{esc(s["lead"])}</p>
      <div class="cta" style="display:flex;flex-wrap:wrap;gap:12px;margin-top:26px"><a class="btn btn-gold wa" data-msg="Hi Concepts, I'm interested in {esc(s['nav'].lower())}." href="https://wa.me/{C['whatsapp']}"><svg><use href="#i-wa"/></svg>Ask on WhatsApp</a><a class="btn btn-ghost" href="#work">See our work</a></div></div>
    <img src="../{s["hero"]}" alt="{esc(s["h1"])} by Concepts" fetchpriority="high">
  </div></div></section>
<section class="block"><div class="wrap cols">
  <article class="prose">{s["body"]}</article>
  {aside("Hi Concepts, I'd like to discuss " + s['nav'].lower() + ".")}
</div></section>
<section class="block tone" id="work"><div class="wrap"><p class="eyebrow">Our work</p><h2>{esc(s["nav"])} by Concepts</h2><div class="pgrid">{photos}</div>
  <p style="margin-top:22px"><a class="link" href="../#projects">See the full portfolio</a></p></div></section>
<section class="block"><div class="wrap"><p class="eyebrow">Questions</p><h2 style="margin-bottom:24px">Frequently asked questions</h2><div class="qas">{faqs}</div></div></section>
<section class="block tone"><div class="wrap"><p class="eyebrow">More services</p><div class="links" style="margin-top:16px">{others}</div></div></section>'''
    schema = [
      {"@context":"https://schema.org","@type":"Service","name":s['h1'],"serviceType":s['service_type'],"description":s['desc'],"url":BASE+path,"image":BASE+'/'+s['hero'],"provider":{"@id":BUSINESS_ID,"@type":"HomeAndConstructionBusiness","name":"Concepts Interiors & Home Decor"},"areaServed":[{"@type":"City","name":"Kozhikode"},{"@type":"State","name":"Kerala"}]},
      {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q, a in s['faqs']]},
      crumb_schema([("Home",BASE+"/"),("Services",BASE+"/#services"),(s['nav'],BASE+path)]),
    ]
    open(os.path.join(DIST, 'services', s['slug'] + '.html'), 'w', encoding='utf8').write(page(path, s['title'], s['desc'], body, schema, s['hero'], s['slug']))
    URLS.append((path, 0.8))

exec(open(os.path.join(HERE, 'products_section.py'), encoding='utf8').read())

# ---------- blog pages ----------
exec(open(os.path.join(HERE, 'blog_section.py'), encoding='utf8').read())

# ---------- 404 ----------
body404 = '''<section class="phero" style="padding-bottom:120px"><div class="wrap"><p class="eyebrow">Page not found</p><h1>This page has moved</h1>
<p class="lede">The page you were looking for isn't here. Start from our home page or message us on WhatsApp.</p>
<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:26px"><a class="btn btn-gold" href="/">Go to home page</a><a class="btn btn-ghost wa" href="https://wa.me/919544355406">WhatsApp us</a></div></div></section>'''
doc404 = page('/404.html', 'Page not found | Concepts', 'Page not found.', body404, [], 'img/transformation-poster.jpg', '404', prefix='/')
doc404 = doc404.replace('content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"', 'content="noindex"')
open(os.path.join(DIST, '404.html'), 'w', encoding='utf8').write(doc404)

# ---------- sitemap, robots, llms.txt, manifest, headers, redirects ----------
sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">']
for path, pri in URLS:
    alt = ''
    if path in ('/', '/ml.html'):
        alt = ''.join(f'<xhtml:link rel="alternate" hreflang="{l}" href="{BASE+p}"/>' for l, p in ALTS)
    imgs = ''
    if path == '/':
        imgs = ''.join(f'<image:image><image:loc>{BASE}/{p["img"]}</image:loc></image:image>' for p in site['projects'][:20])
    sm.append(f'<url><loc>{BASE+path}</loc><lastmod>{TODAY}</lastmod><priority>{pri}</priority>{alt}{imgs}</url>')
sm.append('</urlset>')

# ---------- RSS feed (for newsletter tools and feed readers) ----------
from email.utils import format_datetime
def _rfc(d): return format_datetime(datetime.datetime.fromisoformat(d + 'T09:00:00+05:30'))
items = ''.join(f"""<item><title>{esc(m['title'])}</title><link>{BASE}/journal/{m['slug']}.html</link><guid isPermaLink="true">{BASE}/journal/{m['slug']}.html</guid><pubDate>{_rfc(m['date'])}</pubDate><description>{esc(m['desc'])}</description><enclosure url="{BASE}/{m['img']}" type="image/jpeg" length="0"/></item>""" for m in POSTS[:20])
open(os.path.join(DIST, 'feed.xml'), 'w', encoding='utf8').write(f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Concepts Blog: Interiors and Decor Ideas from Kozhikode</title><link>{BASE}/journal/</link><atom:link href="{BASE}/feed.xml" rel="self" type="application/rss+xml"/><description>Practical interior design and home decor advice for Kerala homes, from Concepts Interiors &amp; Home Decor, Kozhikode.</description><language>en-in</language>{items}</channel></rss>
""")

open(os.path.join(DIST, 'sitemap.xml'), 'w', encoding='utf8').write('\n'.join(sm) + '\n')

open(os.path.join(DIST, 'robots.txt'), 'w').write(f'''# Concepts Interiors & Home Decor, Kozhikode
# All search engines and AI assistants are welcome to read this site.
User-agent: *
Allow: /
Disallow: /admin/

User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot
Allow: /
User-agent: Applebot-Extended
Allow: /

Sitemap: {BASE}/sitemap.xml
''')

svc_lines = '\n'.join(f"- [{s['h1']}]({BASE}/services/{s['slug']}.html): {s['lead']}" for s in SERVICES)
prod_lines = '\n'.join('- ' + c['name'] + ': ' + '; '.join(g['name'] + ' (' + ', '.join(g['items']) + ')' for g in c['groups']) for c in site['catalog'])
art_lines = '\n'.join(f"- [{m['title']}]({BASE}/journal/{m['slug']}.html): {m['desc']}" for m in POSTS)
open(os.path.join(DIST, 'llms.txt'), 'w', encoding='utf8').write(f'''# Concepts Interiors & Home Decor (Concepts Enterprises)

> Interior design, build and home decor company in Kozhikode (Calicut), Kerala, India. Started in 2020 as a decor accessories store; now designs and builds residential and commercial interiors and runs a home decor showroom. Rated {G['rating']} on Google from {G['count']} reviews.

## Key facts
- Address: St Patrick Church Building, near AKG Flyover, Pushpa Junction, Chalappuram, Kozhikode, Kerala 673002, India
- Hours: Monday to Saturday, 9:30 am to 7:30 pm. Closed Sunday.
- WhatsApp / phone: {C['phoneDisplay']} (WhatsApp is the fastest way to reach the team)
- Email: {C['email']}
- Website: {BASE}/ (English) and {BASE}/ml.html (Malayalam)
- Google Business Profile: {C['googleProfile']}
- Instagram: {C['instagram']} · Facebook: {C['facebook']} · WhatsApp Channel: https://whatsapp.com/channel/0029Vagc6QdAYlUFE0jaHE2u
- Languages: English, Malayalam
- Showroom location: in the heart of Calicut, about 500 m from Kozhikode railway station.
- Service area: based in Calicut, focused on the Malabar region and central Kerala; projects across Kerala and beyond depending on the project.
- First a one-to-one meeting; then a free site visit within Calicut city limits. Project consultation is a paid professional service.
- 3D design and itemised quotation before work begins.
- Every project, small or big, is treated as the company's own; the aim is long-term relationships beyond a single contract.
- Work is built at the client's site wherever there is space, so clients can see materials, workmanship and progress; otherwise major work is done in the workshop and installed on site.
- Management team has several years of project experience in the GCC and India.
- Vision: to be the region's trusted interior design team, known for honesty, quality and on-time delivery.
- Mission: design and build residential and commercial interiors of every size, giving each client the best result for their budget. "We offer only what we can deliver, and we deliver everything we offer."
- Values: Faith & integrity, honesty & transparency, commitment, timeliness, sincerity, best value.

## Services
{svc_lines}

## Products ({BASE}/products.html)
{prod_lines}

## Guides
{art_lines}
''')

open(os.path.join(DIST, 'site.webmanifest'), 'w').write(json.dumps({"name":"Concepts Interiors & Home Decor","short_name":"Concepts","start_url":"/","display":"standalone","background_color":"#0D0C0A","theme_color":"#0D0C0A","icons":[{"src":"/img/favicon.png","sizes":"96x96","type":"image/png"}]}, indent=1))

open(os.path.join(DIST, '_headers'), 'w').write('''/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: SAMEORIGIN
/img/*
  Cache-Control: public, max-age=2592000
/media/*
  Cache-Control: public, max-age=2592000
/assets/*
  Cache-Control: public, max-age=86400
/content.js
  Cache-Control: public, max-age=300
''')
open(os.path.join(DIST, '_redirects'), 'w').write('''# The bare domain -> www redirect is handled by Netlify's primary domain setting.
# Friendly short links
/malayalam   /ml.html   301
/reviews     /#reviews  301
/review      https://search.google.com/local/writereview?placeid=ChIJpfdfdWhZpjsRFLl5CqPjCvU  302
/whatsapp    https://wa.me/919544355406  302
''')
print('built', len(URLS), 'pages into', os.path.abspath(DIST))
