"""Title Case helper (AP style) used for headings, labels, buttons and tags."""
import re
MINOR = {'a','an','the','and','but','or','nor','for','so','yet','as','at','by','in','of','on','to','up','via','vs','per','with','from','into','onto','over'}
def _word(w, first, last):
    if w.startswith('&') or w.startswith('http') or '@' in w: return w
    if w in ('m','km','mm','cm','ft','sq','am','pm'): return w
    m = re.match(r'^([^A-Za-z0-9]*)(.*?)([^A-Za-z0-9]*)$', w)
    pre, core, post = m.groups()
    if not core: return w
    if any(c.isupper() for c in core[1:]) or any(c.isdigit() for c in core) or core.startswith('&'): return w
    parts = core.split('-')
    out = []
    for i, p in enumerate(parts):
        if not p: out.append(p); continue
        low = p.lower()
        if low in MINOR and not ((first and i == 0) or (last and i == len(parts) - 1)) and not (pre.endswith(('(', '“', '"'))):
            out.append(low if (p.islower() or (p[0].isupper() and p[1:].islower())) else p)
        else:
            out.append(p[0].upper() + p[1:])
    return pre + '-'.join(out) + post
def tc(text, final=True):
    # keep entities/whitespace; split on spaces
    toks = re.split(r'(\s+)', text)
    words = [i for i, t in enumerate(toks) if t.strip()]
    for n, i in enumerate(words):
        prev = toks[words[n-1]] if n else ''
        first = n == 0 or prev.endswith((':', '·', '—', '–', '.', '?', '!'))
        last = final and n == len(words) - 1
        toks[i] = _word(toks[i], first, last)
    return ''.join(toks)
def tc_html(fragment):
    """Title-case every text node in an HTML fragment (tags untouched)."""
    wrapped = '>' + fragment + '<'
    nodes = list(re.finditer(r'>([^<]+)<', wrapped))
    lastnode = max((i for i, m in enumerate(nodes) if m.group(1).strip()), default=-1)
    out, pos = [], 0
    for i, m in enumerate(nodes):
        out.append(wrapped[pos:m.start(1)]); out.append(tc(m.group(1), final=(i == lastnode))); pos = m.end(1)
    out.append(wrapped[pos:])
    return ''.join(out)[1:-1]

def _close(html, tag, start):
    """index of the matching </tag> for an element whose content starts at `start`"""
    depth, k = 1, start
    while True:
        o = re.compile(r'<' + tag + r'[\s>]').search(html, k)
        c = html.find('</' + tag + '>', k)
        if c == -1: return -1
        if o and o.start() < c: depth += 1; k = o.end()
        else:
            depth -= 1
            if depth == 0: return c
            k = c + 1

OPENERS = [
    r'<(h1|h2|h3)\b[^>]*>',
    r'<(p) class="(?:display|spec|eyebrow)"[^>]*>',
    r'<(a|button)\b[^>]*class="[^"]*\b(?:btn|link|svc-link|go)\b[^"]*"[^>]*>',
    r'<(ul) class="(?:segs|types)"[^>]*>',
    r'<(p) class="vnames"[^>]*>',
    r'<(nav)\b[^>]*class="(?:nav|crumbs|jump|ctabs)"[^>]*>',
    r'<(div) class="(?:links|groups)"[^>]*>',
    r'<(option)>',
    r'<(span) class="go"[^>]*>',
]
def tc_doc(html):
    """Title-case headings, labels, buttons, menus and tags in a whole document (skips scripts/styles)."""
    spans = []
    for pat in OPENERS:
        for m in re.finditer(pat, html):
            tag = m.group(1); end = _close(html, tag, m.end())
            if end > 0: spans.append((m.end(), end))
    # pillar titles, footer link lists
    for m in re.finditer(r'<div class="pillar"><b[^>]*>', html):
        spans.append((m.end(), html.find('</b>', m.end())))
    for m in re.finditer(r'<footer class="site">', html):
        fend = html.find('</footer>', m.end())
        for li in re.finditer(r'<li><a\b[^>]*>', html[m.end():fend]):
            a0 = m.end() + li.end(); spans.append((a0, html.find('</a>', a0)))
    # skip anything inside <script> or <style>
    blocked = [(m.start(), m.end()) for m in re.finditer(r'<(script|style)\b[\s\S]*?</\1>', html)]
    spans = sorted({s for s in spans if not any(b0 <= s[0] < b1 for b0, b1 in blocked)})
    # drop spans nested inside earlier spans
    merged = []
    for s in spans:
        if merged and s[0] < merged[-1][1]: continue
        merged.append(s)
    out, pos = [], 0
    for a, b in merged:
        out.append(html[pos:a]); out.append(tc_html(html[a:b])); pos = b
    out.append(html[pos:])
    return ''.join(out)
