// Newsletter sign-up: emails info@ about each new subscriber (the Brevo list itself is joined from the
// browser through Brevo's double opt-in form). Needs the secret BREVO_API_KEY in Cloudflare
// (Workers & Pages > conceptscalicut > Settings > Variables and secrets).
export async function onRequestPost({ request, env }) {
  const form = await request.formData();
  if (form.get('bot-field')) return new Response('ok');
  const email = String(form.get('email') || '').trim().slice(0, 200);
  const source = String(form.get('source') || 'website').slice(0, 100);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return new Response('Please enter a valid email address.', { status: 400 });
  if (env.BREVO_API_KEY) {
    const esc = s => s.replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        sender: { name: 'Concepts Website', email: 'info@conceptscalicut.com' },
        to: [{ email: env.NOTIFY_EMAIL || 'info@conceptscalicut.com' }],
        subject: 'New newsletter subscriber: ' + email,
        htmlContent: `<p>A new subscriber signed up on conceptscalicut.com.</p><p><b>Email:</b> ${esc(email)}<br><b>Signed up from:</b> ${esc(source)}</p><p>They will join the Brevo list once they confirm the double opt-in email.</p>`,
      }),
    }).catch(() => {});
  }
  if ((request.headers.get('accept') || '').includes('text/html')) return Response.redirect(new URL('/?subscribed=1#subscribe', request.url).toString(), 303);
  return new Response('ok');
}
