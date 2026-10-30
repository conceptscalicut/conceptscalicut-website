
# ---------- products page ----------
def group_card(g, cat):
    style = f' style="object-position:{g["pos"]}"' if g.get('pos') else ''
    pic = (f'<div class="ph"><img src="{g["img"]}" alt="{esc(g["name"])} at Concepts, Kozhikode" loading="lazy"{style}></div>') if g.get('img') else f'<div class="ph ph-empty"><span>{esc(g["name"])}</span></div>'
    chips = ''.join(f'<li>{esc(i)}</li>' for i in g['items'])
    msg = esc('Hi Concepts, please share options and prices for ' + g['name'].lower() + '.')
    return (f'<article class="grp" id="{g["id"]}">{pic}<div class="body"><p class="eyebrow">{esc(cat["name"])}</p><h3>{esc(g["name"])}</h3><p>{esc(g["text"])}</p><ul class="types">{chips}</ul>'
            f'<a class="btn btn-ghost btn-sm wa" data-msg="{msg}" href="https://wa.me/{C["whatsapp"]}"><svg><use href="#i-wa"/></svg>Ask for options &amp; prices</a></div></article>')

fp = site.get('featured')
feat_html = ''
if fp:
    img2 = f'<img src="{fp["img2"]}" alt="" loading="lazy">' if fp.get('img2') else ''
    hl = ''.join(f'<li>{esc(h)}</li>' for h in fp.get('highlights', []))
    one = '' if fp.get('img2') else ' one'
    fmsg = esc('Hi Concepts, I am interested in your featured product: ' + fp['title'] + '.')
    feat_html = (f'<section class="block" style="padding-top:clamp(36px,5vw,64px)"><div class="wrap"><article class="feat"><div class="pics{one}"><img src="{fp["img"]}" alt="{esc(fp["title"])}" loading="lazy">{img2}</div>'
                 f'<div class="info"><span class="badge">{esc(fp["badge"])}</span><h3>{esc(fp["title"])}</h3><p>{esc(fp["text"])}</p><ul>{hl}</ul>'
                 f'<div class="row"><a class="btn btn-gold btn-sm wa" data-msg="{fmsg}" href="https://wa.me/{C["whatsapp"]}"><svg><use href="#i-wa"/></svg>Enquire on WhatsApp</a></div></div></article></div></section>')

tabs = ''.join(f'<a href="#{c["id"]}">{esc(c["name"])}</a>' for c in site['catalog'])
cats_html = ''
for idx, c in enumerate(site['catalog']):
    jump = ''.join(f'<a href="#{g["id"]}">{esc(g["name"])}</a>' for g in c['groups'])
    tone = ' tone' if idx % 2 == 0 else ''
    num = str(idx + 1).zfill(2)
    cards = ''.join(group_card(g, c) for g in c['groups'])
    if len(c['groups']) % 3:
        amsg = esc('Hi Concepts, I am looking for ' + c['name'].lower() + ' that are not listed on your website.')
        cards += (f'<article class="grp grp-ask"><div class="body"><p class="eyebrow">{esc(c["name"])}</p><h3>Looking for something else?</h3>'
                  '<p>Our showroom carries more than we can list here, and we can source to your design. Tell us what you have in mind.</p>'
                  f'<a class="btn btn-gold btn-sm wa" data-msg="{amsg}" href="https://wa.me/{C["whatsapp"]}"><svg><use href="#i-wa"/></svg>Ask us on WhatsApp</a></div></article>')
    cats_html += (f'<section class="block{tone}" id="{c["id"]}"><div class="wrap">'
                  f'<div class="head"><div><p class="eyebrow">Collection {num}</p><h2>{esc(c["name"])}</h2><p class="lede">{esc(c["intro"])}</p></div></div>'
                  f'<nav class="jump" aria-label="{esc(c["name"])} groups">{jump}</nav><div class="grps">{cards}</div>'
                  '<p class="more-note">And more in the showroom. If you are looking for something specific, ask us on WhatsApp.</p></div></section>')

prod_body = ('<section class="phero"><div class="wrap">' + crumbs([("Home", "./"), ("Products", None)]) +
    '<div class="grid"><div><p class="eyebrow">Products · Showroom 500 m from Kozhikode railway station</p><h1>Interior and decor products</h1>'
    '<p class="lede">The materials and finishing pieces we use in our own projects, in two collections. See them in person at our showroom in the heart of Calicut, or ask on WhatsApp for photos, sizes and prices.</p>'
    f'<nav class="ctabs" aria-label="Collections">{tabs}</nav></div><img src="{site["catalog"][0]["cover"]}" alt="Interior products by Concepts" fetchpriority="high"></div></div></section>'
    + feat_html + cats_html +
    '<section class="block"><div class="wrap cols"><div class="prose"><h2>Visit the showroom</h2><p>In the heart of Calicut, just 500 m from Kozhikode railway station: St Patrick Church Building, near AKG Flyover, Pushpa Junction, Kozhikode 673002. Open Monday to Saturday, 9:30 am to 7:30 pm. Message us before you visit and we will keep samples ready.</p>'
    f'<p><a class="link" href="{C["directions"]}" target="_blank" rel="noopener">Get directions on Google Maps</a></p></div>'
    + aside("Hi Concepts, I'd like to know more about your products.") + '</div></section>')
all_groups = [g for c in site['catalog'] for g in c['groups']]
item_list = {"@context": "https://schema.org", "@type": "ItemList", "name": "Interior and decor products at Concepts, Kozhikode",
             "itemListElement": [{"@type": "ListItem", "position": n + 1, "name": g['name'], "url": f"{BASE}/products.html#{g['id']}"} for n, g in enumerate(all_groups)]}
prod_doc = page('/products.html', 'Interior & Decor Products in Kozhikode: Wallpapers, Panels, Mirrors | Concepts',
    'Interior and decor products in Kozhikode: wallpapers, wall panels, louvers, curtains, flooring, mirrors, curios, calligraphy, plants, pots and frames. Showroom 500 m from the railway station.',
    prod_body, [item_list, crumb_schema([("Home", BASE + "/"), ("Products", BASE + "/products.html")])], site['catalog'][0]['cover'], 'products', prefix='')
open(os.path.join(DIST, 'products.html'), 'w', encoding='utf8').write(prod_doc)
URLS.append(('/products.html', 0.9))
