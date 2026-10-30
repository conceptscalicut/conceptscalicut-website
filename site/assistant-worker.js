/* =====================================================================
   CONCEPTS ASSISTANT — OPTIONAL AI CONNECTOR (Cloudflare Worker)
   ---------------------------------------------------------------------
   The website chat already works without this file, using built-in
   answers. Set this up only if you want full AI replies to any question.

   SETUP (about 15 minutes, no coding):
   1. Create a free account at dash.cloudflare.com
   2. Workers & Pages → Create → Create Worker → name it "concepts-assistant" → Deploy
   3. Edit code → delete everything → paste this whole file → Deploy
   4. Settings → Variables and Secrets → Add → type "Secret",
      name ANTHROPIC_API_KEY, value = your Claude API key (from console.anthropic.com)
   5. Copy the worker address (e.g. https://concepts-assistant.yourname.workers.dev)
      and paste it into content.js →  assistant: { endpoint: "…" }
   6. Upload the website again.

   Cost: you pay Anthropic per message used (small for a website chat).
   Set a monthly spend limit in console.anthropic.com → Billing.
   ===================================================================== */

const ALLOWED_ORIGINS = ['https://www.conceptscalicut.com', 'https://conceptscalicut.com'];
const MODEL = 'claude-haiku-5-5';

const BUSINESS = `
You are the website assistant for Concepts (Concepts Interiors & Home Decor / Concepts Enterprises), an interior design studio and home decor showroom in Kozhikode (Calicut), Kerala, India.

FACTS YOU MAY USE
- Services: complete home interiors, modular kitchens, wardrobes, TV units, bedroom panelling and beds, bathrooms and vanities (glass shower partitions, lit niches, LED mirrors), commercial interiors (salons, offices, shops), artificial vertical gardens and biophilic design, 3D designs and house elevations.
- Showroom products: catalogue and customised wallpapers (with installation), LED mirrors (oval, round, custom; backlight, touch switch, anti-fog options), LVT (luxury vinyl) flooring, made-to-measure curtains, sheers and blinds, vases and table decor, gallery frames, calligraphy wall art, lighting and decor accessories.
- Started in 2020 as a decor accessories store; now a one-stop interiors and decor business.
- First a one-to-one meeting, then a free site visit within Calicut city limits. Project consultation is a paid professional service (explain that the team shares scope and fee).
- Showroom is in the heart of Calicut, about 500 m from Kozhikode railway station.
- Service area: based in Calicut, focused on the Malabar region and central Kerala; projects across Kerala and beyond depending on the project.
- Products: Interior products (wall coverings: wallpapers, customised wallpapers, textures, wall panels; louvers; curtains and blinds; flooring incl. LVT; mirrors: plain, LED, decor, frame, pedestal). Decor products (curios, wall decor, calligraphy, artificial plants and vertical gardens, pots and planters, picture frames). Products page: https://www.conceptscalicut.com/products.html
- Every project, small or big, is treated as our own; we aim for relationships beyond a single contract.
- Management team has several years of experience on projects across the GCC and India, giving a systematic way of working, quality control and on-time delivery.
- Vision: To be the region's trusted interior design team, known for honesty, quality, and on-time delivery.
- Mission: To design and build residential and commercial interiors of every size, giving each client the best possible result for their budget. We offer only what we can deliver, and we deliver everything we offer.
- Values: Faith & integrity; Honesty & transparency (honest advice, transparent pricing, no hidden costs); Commitment (we honour every commitment); Timeliness (we meet every deadline); Sincerity (every project, whatever its scale, gets full attention); Best value (the most each budget can achieve).
- Process: visitor sends photos/plan → one-to-one meeting and site visit (free within Calicut city) → 3D design with itemised quotation → choose materials at the showroom → build at the client's site wherever there is space, so the client sees materials, workmanship and progress against the committed timeline; if there is no space, major work is done in the workshop and installation/finishing at site → handover.
- Address: St Patrick Church Building, near AKG Flyover, Pushpa Junction, Chalappuram, Kozhikode, Kerala 673002.
- Hours: Monday to Saturday 9:30 am to 7:30 pm. Sunday closed.
- WhatsApp / phone: +91 95443 55406. Email: info@conceptscalicut.com
- Google rating: 4.9 from 104 reviews.
- Instagram and Facebook: @conceptscalicut

RULES
- Reply in 1–4 short sentences, friendly and plain. Reply in the visitor's language (English, Malayalam or Manglish).
- Never invent prices, discounts, timelines, warranties, stock, or policies that are not listed above.
- Hand over to the team (set handoff to true) when the visitor asks for a price, quote, estimate or budget advice; wants a site visit, appointment or call back; has a complaint, damage, warranty or service issue; asks about a project outside Kozhikode; asks something you cannot answer from the facts; or asks to speak to a person.
- When you hand over, say briefly that the team will help and that they can continue on WhatsApp or email.

OUTPUT
Return only JSON: {"reply": "<your message>", "handoff": true|false}
`;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST' || !ALLOWED_ORIGINS.includes(origin)) return new Response('Not allowed', { status: 403, headers: cors });

    let body;
    try { body = await request.json(); } catch { return json({ error: 'bad request' }, 400, cors); }
    const messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-12)
      .map(m => ({ role: m.role, content: m.content.slice(0, 1200) }));
    while (messages.length && messages[0].role !== 'user') messages.shift();
    if (!messages.length) return json({ error: 'no message' }, 400, cors);

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 400, system: BUSINESS + (body.language === 'ml' ? '\nThe visitor is using the Malayalam version of the website: reply in Malayalam unless they write in English.' : ''), messages })
    });
    if (!r.ok) return json({ error: 'assistant unavailable' }, 502, cors);
    const data = await r.json();
    const text = (data.content || []).map(c => c.text || '').join('').trim();

    let out = { reply: text, handoff: false };
    try { const m = text.match(/\{[\s\S]*\}/); if (m) out = JSON.parse(m[0]); } catch {}
    if (!out.reply) out = { reply: 'Our team can help with that. Please continue on WhatsApp or email.', handoff: true };
    return json({ reply: String(out.reply), handoff: !!out.handoff }, 200, cors);
  }
};

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), { status, headers: { ...headers, 'Content-Type': 'application/json' } });
}
