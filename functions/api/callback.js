// GitHub sends the editor back here after login; hand the token to Decap CMS in the opener window.
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code'), state = url.searchParams.get('state');
  const cookie = (request.headers.get('cookie') || '').match(/cms_state=([\w-]+)/);
  let status = 'error', content = { error: 'Login failed. Please close this window and try again.' };
  if (code && state && cookie && cookie[1] === state) {
    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST', headers: { accept: 'application/json', 'content-type': 'application/json', 'user-agent': 'concepts-cms' },
      body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code }),
    }).then(r => r.json()).catch(() => ({}));
    if (r.access_token) { status = 'success'; content = { token: r.access_token, provider: 'github' }; }
  }
  const msg = JSON.stringify(`authorization:github:${status}:${JSON.stringify(content)}`);
  const html = `<!doctype html><meta charset="utf-8"><title>Signing in…</title><p style="font-family:sans-serif">Signing in…</p><script>
(function(){var origin=${JSON.stringify(url.origin)};function done(e){if(e.origin!==origin)return;window.opener.postMessage(${msg},origin);window.removeEventListener('message',done);setTimeout(function(){window.close()},300)}
window.addEventListener('message',done);window.opener&&window.opener.postMessage('authorizing:github',origin);})();</script>`;
  return new Response(html, { headers: { 'content-type': 'text/html;charset=utf-8', 'Set-Cookie': 'cms_state=; Path=/api; Max-Age=0' } });
}
