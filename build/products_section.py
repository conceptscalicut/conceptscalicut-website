
# ---------- products page ----------
import re as _re
PDATA = {}
def _pid(g, pr): return g['id'] + '--' + _re.sub(r'[^a-z0-9]+', '-', pr['name'].lower()).strip('-')

def _price_text(pr):
    """'From ₹2,500 per sq ft' when content.js gives a starting price, else ''."""
    p = pr.get('price')
    if not p: return ''
    unit = (' ' + pr['price_unit']) if pr.get('price_unit') else ''
    return f'Approx. from ₹{int(p):,}{unit}'

def tile(pr, g):
    pid = _pid(g, pr)
    gal = [x for x in ([pr.get('img')] + pr.get('gallery', [])) if x]
    PDATA[pid] = {'n': pr['name'], 't': pr.get('text', ''), 'd': pr.get('details', []), 'g': gal, 'grp': g['name'], 'gid': g['id'], 'p': _price_text(pr), 'u': f'product/{pid}.html'}
    msg = esc('Hi Concepts, please share options and prices for ' + pr['name'] + '.')
    more = f'<span class="pt-more">{len(gal)} photos</span>' if len(gal) > 1 else ''
    pic = (f'<div class="ph"><img src="{pr["img"]}" alt="{esc(pr["name"])} from Concepts, Kozhikode" loading="lazy">{more}<span class="pt-view">View details</span></div>' if pr.get('img')
           else f'<div class="ph ph-empty"><span>{esc(pr["name"])}</span><span class="pt-view">View details</span></div>')
    return (f'<article class="ptile" data-pid="{pid}"><button class="pt-open" type="button" aria-label="View {esc(pr["name"])}">{pic}</button>'
            f'<div class="pt-body"><h4><button class="pt-open pt-name" type="button">{esc(pr["name"])}</button></h4><p>{esc(pr.get("text", ""))}</p>'
            + (f'<p class="pt-price">{esc(_price_text(pr))}</p>' if pr.get('price') else '') +
            f'<div class="pt-links"><a class="pt-ask wa" data-msg="{msg}" href="https://wa.me/{C["whatsapp"]}"><svg><use href="#i-wa"/></svg>Enquire</a>'
            f'<a class="pt-page" href="product/{pid}.html">Product page</a></div></div></article>')

def group_card(g, cat):
    msg = esc('Hi Concepts, please share options and prices for ' + g['name'].lower() + '.')
    tiles = ''.join(tile(pr, g) for pr in g.get('products', []))
    n = len(g.get('products', []))
    return (f'<div class="pgroup" id="{g["id"]}"><div class="pg-head"><div><p class="eyebrow">{esc(cat["name"])} · {n} product{"s" if n != 1 else ""}</p><h3>{esc(g["name"])}</h3><p>{esc(g["text"])}</p></div>'
            f'<a class="btn btn-ghost btn-sm wa" data-msg="{msg}" href="https://wa.me/{C["whatsapp"]}"><svg><use href="#i-wa"/></svg>Ask for options &amp; prices</a></div>'
            f'<div class="ptiles">{tiles}</div></div>')

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
    cats_html += (f'<section class="block{tone}" id="{c["id"]}"><div class="wrap">'
                  f'<div class="head"><div><p class="eyebrow">Collection {num}</p><h2>{esc(c["name"])}</h2><p class="lede">{esc(c["intro"])}</p></div></div>'
                  f'<nav class="jump" aria-label="{esc(c["name"])} groups">{jump}</nav><div class="pgroups">{cards}</div>'
                  f'<p class="more-note">And more in the showroom. Looking for something specific? <a class="link wa" data-msg="Hi Concepts, I am looking for something that is not listed on your website." href="https://wa.me/{C["whatsapp"]}">Ask us on WhatsApp</a>.</p></div></section>')

prod_body = ('<section class="phero"><div class="wrap">' + crumbs([("Home", "./"), ("Products", None)]) +
    '<div class="grid"><div><p class="eyebrow">Products · Showroom 500 m from Kozhikode railway station</p><h1>Interior and decor products</h1>'
    '<p class="lede">The materials and finishing pieces we use in our own projects, in three collections. See them in person at our showroom in the heart of Calicut, or ask on WhatsApp for photos, sizes and prices.</p><p class="pp-price-note" style="margin-top:10px">Most of what we supply is customised to your space. Prices shown are approximate starting points; the final price depends on your requirements.</p>'
    f'<nav class="ctabs" aria-label="Collections">{tabs}</nav></div><img src="{site["catalog"][0]["cover"]}" alt="Interior products by Concepts" fetchpriority="high"></div></div></section>'
    + feat_html + cats_html +
    '<dialog class="pmodal" id="pmodal" aria-labelledby="pm-name"><div class="pm-inner">'
    '<button class="pm-x" type="button" aria-label="Close">&times;</button>'
    '<div class="pm-gal"><div class="pm-main"><img id="pm-img" alt=""><button class="pm-nav pm-prev" type="button" aria-label="Previous photo">&#8249;</button><button class="pm-nav pm-next" type="button" aria-label="Next photo">&#8250;</button><span class="pm-count" id="pm-count"></span></div><div class="pm-thumbs" id="pm-thumbs"></div></div>'
    '<div class="pm-info"><p class="eyebrow" id="pm-grp"></p><h3 id="pm-name"></h3><p id="pm-text"></p><p class="pm-price" id="pm-price" hidden></p><ul id="pm-details"></ul>'
    '<div class="pm-cta"><a class="btn btn-gold btn-sm wa" id="pm-wa" href="#"><svg><use href="#i-wa"/></svg>Enquire on WhatsApp</a><a class="btn btn-ghost btn-sm" id="pm-call" href="tel:+919544355406">Call Us</a><a class="btn btn-ghost btn-sm" id="pm-page" href="#">Product page</a></div>'
    '<p class="pm-note">Message us for sizes, finishes and prices, or visit our showroom near Kozhikode railway station to see it in person.</p>'
    '<div class="pm-related" id="pm-related"></div></div></div></dialog>'
    '<script type="application/json" id="pdata">' + json.dumps(PDATA, ensure_ascii=False).replace('</', '<\\/') + '</script>'
    '<script src="assets/products.js" defer></script>' +
    '<section class="block"><div class="wrap cols"><div class="prose"><h2>Visit the showroom</h2><p>In the heart of Calicut, just 500 m from Kozhikode railway station: St Patrick Church Building, Francis Road, near Kozhikode Railway Station, Kozhikode 673002. Open Monday to Saturday, 9:30 am to 7:30 pm. Message us before you visit and we will keep samples ready.</p>'
    f'<p><a class="link" href="{C["directions"]}" target="_blank" rel="noopener">Get directions on Google Maps</a></p></div>'
    + aside("Hi Concepts, I'd like to know more about your products.") + '</div></section>')
all_groups = [g for c in site['catalog'] for g in c['groups']]
item_list = {"@context": "https://schema.org", "@type": "ItemList", "name": "Interior and decor products at Concepts, Kozhikode",
             "itemListElement": [{"@type": "ListItem", "position": n + 1, "name": g['name'], "url": f"{BASE}/products.html#{g['id']}"} for n, g in enumerate(all_groups)]}
prod_doc = page('/products.html', 'Wallpapers, Curtains, Blinds, Mirrors & Home Decor in Calicut | Concepts',
    'Home decor shop in Calicut: wallpapers, wall panels, false ceilings, curtains, blinds, flooring, LED mirrors, lighting, furniture and decor. Near the railway station.',
    prod_body, [item_list, crumb_schema([("Home", BASE + "/"), ("Products", BASE + "/products.html")])], site['catalog'][0]['cover'], 'products', prefix='')
open(os.path.join(DIST, 'products.html'), 'w', encoding='utf8').write(prod_doc)
URLS.append(('/products.html', 0.9))

# ---------- one page per product (landing pages for Google Merchant Center and search) ----------
os.makedirs(os.path.join(DIST, 'product'), exist_ok=True)
SHOWROOM = C['address']
for c in site['catalog']:
    for g in c['groups']:
        for pr in g.get('products', []):
            pid = _pid(g, pr)
            path = f'/product/{pid}.html'
            gal = [x for x in ([pr.get('img')] + pr.get('gallery', [])) if x]
            price = _price_text(pr)
            msg = esc('Hi Concepts, I am interested in ' + pr['name'] + ' (' + g['name'] + '). Please share options, sizes and prices.')
            main_img = (f'<img src="../{gal[0]}" alt="{esc(pr["name"])} from Concepts, Kozhikode" fetchpriority="high">' if gal
                        else f'<div class="pp-noimg"><span>{esc(pr["name"])}</span></div>')
            thumbs = ''.join(f'<img src="../{s}" alt="{esc(pr["name"])}, photo {n + 2}" loading="lazy">' for n, s in enumerate(gal[1:]))
            details = ''.join(f'<li>{esc(d)}</li>' for d in pr.get('details', []))
            rel = [r for r in g.get('products', []) if r is not pr][:6]
            rel_html = ''.join(f'<a href="{_pid(g, r)}.html">{esc(r["name"])}</a>' for r in rel)
            body = (f'<section class="phero"><div class="wrap">'
                    + crumbs([("Home", "../"), ("Products", "../products.html"), (g['name'], f'../products.html#{g["id"]}'), (pr['name'], None)]) +
                    f'<div class="grid pp-grid"><div><p class="eyebrow">{esc(c["name"])} · {esc(g["name"])}</p><h1>{esc(pr["name"])}</h1>'
                    f'<p class="lede">{esc(pr.get("text", ""))}</p>'
                    + (f'<p class="pp-price">{esc(price)}</p><p class="pp-price-note">We specialise in customised work, so this is a rough guide. The final price depends on your requirements: size, design, features and finish. Message us for an exact quote.</p>' if price else
                       '<p class="pp-price-note">We specialise in customised work, so prices depend on your requirements. Message us on WhatsApp or call for options and a quote.</p>')
                    + (f'<ul class="pp-details">{details}</ul>' if details else '') +
                    f'<div class="cta" style="display:flex;flex-wrap:wrap;gap:12px;margin-top:26px"><a class="btn btn-gold wa" data-msg="{msg}" href="https://wa.me/{C["whatsapp"]}"><svg><use href="#i-wa"/></svg>Enquire on WhatsApp</a>'
                    f'<a class="btn btn-ghost" href="tel:{C["phoneLink"]}">Call {esc(C["phoneDisplay"])}</a></div></div>'
                    f'{main_img}</div></div></section>'
                    + (f'<section class="block tone"><div class="wrap"><p class="eyebrow">Photos</p><h2>{esc(pr["name"])} at Concepts</h2><div class="pgrid">{thumbs}</div></div></section>' if thumbs else '') +
                    f'<section class="block"><div class="wrap cols"><div class="prose"><h2>See it at our showroom</h2><p>Visit us at {esc(SHOWROOM)}. Open Monday to Saturday, 9:30 am to 7:30 pm. Message us before you visit and we will keep samples ready.</p>'
                    f'<p><a class="link" href="{C["directions"]}" target="_blank" rel="noopener">Get directions on Google Maps</a></p>'
                    + (f'<h2>More in {esc(g["name"])}</h2><div class="links" style="margin-top:16px">{rel_html}</div>' if rel_html else '') +
                    f'<p style="margin-top:22px"><a class="link" href="../products.html#{g["id"]}">See all {esc(g["name"].lower())}</a></p></div>'
                    + aside('Hi Concepts, I am interested in ' + pr['name'] + '.') + '</div></section>')
            product = {"@context": "https://schema.org", "@type": "Product", "name": pr['name'], "description": pr.get('text', '') or g.get('text', ''),
                       "url": BASE + path, "category": f"{c['name']} > {g['name']}", "brand": {"@type": "Brand", "name": "Concepts"},
                       "seller": {"@id": BUSINESS_ID}}
            if gal: product["image"] = [BASE + '/' + s for s in gal[:6]]
            if pr.get('price'):
                product["offers"] = {"@type": "Offer", "url": BASE + path, "priceCurrency": "INR", "price": str(int(pr['price'])),
                                     "availability": "https://schema.org/InStock", "itemCondition": "https://schema.org/NewCondition",
                                     "seller": {"@id": BUSINESS_ID}}
            schema = [product, crumb_schema([("Home", BASE + "/"), ("Products", BASE + "/products.html"), (pr['name'], BASE + path)])]
            desc = (pr.get('text', '') + ' ' + (price + '. ' if price else '') + 'At Concepts, Kozhikode, near the railway station.').strip()
            doc = page(path, f'{pr["name"]} in Calicut (Kozhikode) | Concepts', desc[:300], body, schema, gal[0] if gal else c['cover'], 'products')
            open(os.path.join(DIST, 'product', pid + '.html'), 'w', encoding='utf8').write(doc)
            URLS.append((path, 0.6))

# ---------- product pop-up script ----------
open(os.path.join(DIST, 'assets', 'products.js'), 'w', encoding='utf8').write(r'''(function(){
var D=JSON.parse(document.getElementById('pdata').textContent), dlg=document.getElementById('pmodal'), $=function(id){return document.getElementById(id)};
var cur=null, idx=0, WA='919544355406';
function track(n,p){try{gtag('event',n,p||{})}catch(_){}}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function show(i){var g=cur.g; if(!g.length){$('pm-img').hidden=true;return;} idx=(i+g.length)%g.length; var im=$('pm-img'); im.hidden=false; im.src=g[idx]; im.alt=cur.n+' – photo '+(idx+1);
  $('pm-count').textContent=g.length>1?(idx+1)+' / '+g.length:''; dlg.querySelectorAll('.pm-nav').forEach(function(b){b.hidden=g.length<2});
  [].forEach.call($('pm-thumbs').children,function(t,k){t.setAttribute('aria-current',k===idx)});}
function open(pid){cur=D[pid]; if(!cur)return; var g=cur.g;
  $('pm-grp').textContent=cur.grp; $('pm-name').textContent=cur.n; $('pm-text').textContent=cur.t; $('pm-price').textContent=cur.p?cur.p+' · customised to your requirements, so the final price may vary':''; $('pm-price').hidden=!cur.p; $('pm-page').href=cur.u;
  $('pm-details').innerHTML=(cur.d||[]).map(function(x){return '<li>'+esc(x)+'</li>'}).join(''); $('pm-details').hidden=!(cur.d||[]).length;
  $('pm-thumbs').innerHTML=g.length>1?g.map(function(s,k){return '<button type="button" data-k="'+k+'"><img src="'+esc(s)+'" alt="" loading="lazy"></button>'}).join(''):'';
  var msg='Hi Concepts, I am interested in '+cur.n+' ('+cur.grp+'). Please share options, sizes and prices.'; $('pm-wa').href='https://wa.me/'+WA+'?text='+encodeURIComponent(msg);
  var rel=Object.keys(D).filter(function(k){return D[k].gid===cur.gid && k!==pid}).slice(0,6);
  $('pm-related').innerHTML=rel.length?'<p class="eyebrow">More in '+esc(cur.grp)+'</p><div>'+rel.map(function(k){var r=D[k];return '<button type="button" data-pid="'+k+'">'+(r.g[0]?'<img src="'+esc(r.g[0])+'" alt="" loading="lazy">':'<span class="pm-noimg"></span>')+'<span>'+esc(r.n)+'</span></button>'}).join('')+'</div>':'';
  show(0); if(!dlg.open){dlg.showModal(); document.documentElement.style.overflow='hidden';} dlg.querySelector('.pm-inner').scrollTop=0;
  try{history.replaceState(null,'','#p-'+pid)}catch(_){} track('product_view',{item:cur.n,group:cur.grp});}
function close(){dlg.close();}
dlg.addEventListener('close',function(){document.documentElement.style.overflow='';try{history.replaceState(null,'',location.pathname)}catch(_){}});
document.addEventListener('click',function(e){var b=e.target.closest('.pt-open'); if(b){e.preventDefault(); open(b.closest('.ptile').dataset.pid);}});
dlg.addEventListener('click',function(e){ if(e.target===dlg||e.target.closest('.pm-x')) return close();
  if(e.target.closest('.pm-prev')) return show(idx-1); if(e.target.closest('.pm-next')) return show(idx+1);
  var t=e.target.closest('#pm-thumbs button'); if(t) return show(+t.dataset.k);
  var r=e.target.closest('#pm-related button'); if(r) return open(r.dataset.pid);
  if(e.target.closest('#pm-wa')) track('generate_lead',{method:'whatsapp',item:cur&&cur.n});
  if(e.target.closest('#pm-call')) track('phone_click',{item:cur&&cur.n}); });
document.addEventListener('keydown',function(e){ if(!dlg.open)return; if(e.key==='ArrowRight')show(idx+1); if(e.key==='ArrowLeft')show(idx-1); });
var sx=null; $('pm-img').addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
$('pm-img').addEventListener('touchend',function(e){ if(sx===null)return; var dx=e.changedTouches[0].clientX-sx; if(Math.abs(dx)>40) show(idx+(dx<0?1:-1)); sx=null; });
var h=location.hash.match(/^#p-(.+)$/); if(h && D[h[1]]) open(h[1]);
})();
''')
