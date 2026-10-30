# Concepts website: how to go live and keep it updated

## What's in this folder

Upload only the **`website`** folder. The other files in the zip are guides and optional extras.

| File / folder (inside `website`) | What it is |
|---|---|
| `index.html`, `ml.html` | English and Malayalam homepages |
| `services/`, `journal/` | Service pages and articles |
| `sitemap.xml`, `robots.txt`, `llms.txt`, `_redirects`, `_headers` | Files for search engines, AI tools and Netlify. Leave as they are. |
| `content.js` | **Edit this one.** Photos, videos, reviews, contact details, hours, Google Analytics ID and chat settings. |
| `img/` | All photos. |
| `media/` | All videos (`transformation.mp4` is the home page film). |
| `assistant-worker.js` (outside `website`) | Optional. Switches the chat assistant to full AI answers (section 6). |
| `SEO-AND-VISIBILITY-CHECKLIST.md` (outside `website`) | Steps for Google, Maps, reviews and AI search |

---

## Where things stand today (checked 28 Oct 2026)

- **Domain registrar / DNS:** GoDaddy. The domain's name servers are `ns47` and `ns48.domaincontrol.com`, which belong to GoDaddy.
- **www.conceptscalicut.com** currently points to your ChatGPT-built site (a CNAME record to `custom-domains.chatgpt.site`). The bare `conceptscalicut.com` also points there.
- **Email:** the domain has **no MX records**. Mail sent to info@conceptscalicut.com has nowhere to go and will probably bounce. See section 3.

---

## 1. Put the website online (about 10 minutes)

1. Go to **app.netlify.com** and sign up (free). "Sign up with Google" is easiest.
2. Click **Add new site → Deploy manually**.
3. Unzip the download on your computer, then drag the **`website`** folder onto the upload box.
4. Netlify gives you a test address such as `concepts-xyz.netlify.app`. Open it on your phone and check everything.
5. Optional: **Site configuration → Change site name** to `conceptscalicut`, so the test address becomes `conceptscalicut.netlify.app`.

## 2. Connect www.conceptscalicut.com (about 15 minutes, then up to a few hours to take effect)

**In Netlify**
1. Open your site, then **Domain management → Add a domain**. Type `www.conceptscalicut.com` and click **Verify**, then **Add domain**. If Netlify asks whether you own it, choose the option to add it anyway.
2. Netlify also adds `conceptscalicut.com` and shows **"Awaiting External DNS"**. Click it to see the exact values Netlify wants.

**In GoDaddy** (sign in → **My Products → conceptscalicut.com → DNS**)
3. Find the **CNAME** record named `www`, the one pointing to `custom-domains.chatgpt.site`. Click **Edit** and change the value to your Netlify address, for example `conceptscalicut.netlify.app`. Save.
4. Find the two **A** records named `@`. Delete one, and edit the other so its value is the IP address Netlify showed you in step 2. Save.
5. Don't touch any other records.

**Finish**
6. In the ChatGPT site settings, remove the custom domain so the old site stops claiming it.
7. Back in Netlify, wait until the domain shows a green tick. HTTPS (the padlock) is switched on automatically, usually within an hour.
8. Open www.conceptscalicut.com on your phone with mobile data, not Wi-Fi, to check.

## 3. Fix your email (important)

The website sends enquiries to info@conceptscalicut.com, but the domain has no email service attached. Choose one:
- **Google Workspace** (paid, uses Gmail) or **Zoho Mail** (has a free plan for small teams), or GoDaddy's own email.
- Each one gives you **MX records** to add in GoDaddy → DNS. After that, mail to info@ starts arriving.
- Until this is done, you can change the email in `content.js` (and the two email links in `index.html`) to an address that already works, such as conceptsincalicut@gmail.com.

## 4. Google Analytics (see who visits and which buttons bring enquiries)

1. Go to **analytics.google.com** and sign in with your business Google account.
2. **Start measuring** → Account name `Concepts` → Property name `conceptscalicut.com` → time zone India, currency INR → choose **Web**, enter `https://www.conceptscalicut.com`.
3. Copy the **Measurement ID**. It looks like `G-AB12CD34EF`.
4. In `content.js`, paste it here: `analytics: { ga4: "G-AB12CD34EF" }`. Save and upload the folder again.
5. In Analytics → **Admin → Events**, once events start appearing (about a day), mark **generate_lead**, **whatsapp_click** and **phone_click** as **Key events**.

What the site reports:

| Event | When it fires |
|---|---|
| `whatsapp_click` | Any WhatsApp button, with which section it was in |
| `phone_click` / `email_click` | Call or email links |
| `generate_lead` | Contact form sent (WhatsApp or email), with the service chosen |
| `chat_open`, `chat_message`, `chat_handoff` | Chat assistant use, and when it passes a visitor to your team |
| `project_view`, `article_open` | Which project photos and journal articles people open |
| `directions_click`, `google_profile_click`, `social_click` | Map, Google profile, Instagram and Facebook |
| `language_switch` | Visitors switching to Malayalam |

Analytics runs only on your live domain (and the Netlify test address), never in previews.

## 5. Changing photos, videos and text

**Add or replace a project photo**
1. Copy the photo into `img/`. JPG about 1600 px wide works best.
2. In `content.js`, under `projects:`, copy any line and change the file name, title, category and detail.

**Change the home page video**: put the new `.mp4` in `media/` (under 40 seconds, under 8 MB, landscape). Change `heroVideo → src` in `content.js`, and set the three `chapters` times to where Design, Build and Finished start.

**Add a Google review**: copy a line under `reviews:` and paste the name and text exactly as they appear on Google.

**Malayalam text**
- Product names and descriptions have `_ml` versions next to the English in `content.js`. The video chapter labels have `label_ml` and `note_ml`.
- For other Malayalam wording changes, send the corrections to Claude. The Malayalam text lives in both the language switch and the separate `ml.html` page, and a rebuild updates both.
- Visitors switch language with the മലയാളം / English button. The site remembers their choice. You can also share a direct Malayalam link: `https://www.conceptscalicut.com/?lang=ml`.
- Journal articles and Google reviews stay in English in both versions.

**Publish your changes**: in Netlify, go to **Deploys** and drag the `website` folder in again. The live site updates in under a minute.

**Text changes and search engines**: photo, video, review and contact changes in `content.js` show up for visitors straight away. The homepage text is also written into the page files for Google and AI tools, so after bigger changes (new projects, new reviews, edited wording) ask Claude to rebuild the site. That keeps what search engines read in step with what visitors see.

## 6. The chat assistant

- **As delivered (free, no setup):** it answers common questions in English or Malayalam: services, products, location, hours, process, about you and your values. Questions about prices, quotes, site visits, complaints, projects outside Kozhikode, or anything it doesn't know are passed to your team, with one-tap WhatsApp and Email buttons and the visitor's questions already copied in.
- **Optional, full AI answers:** follow the steps at the top of `assistant-worker.js`. You need a free Cloudflare account and a Claude API key; you pay per message, so set a monthly spend limit. Then paste the worker address into `content.js → assistant → endpoint`.

## 7. Replacing the whole website later

The domain is yours and isn't tied to this website. To change sites later:
- **Same host:** drag the new site's folder into Netlify → Deploys. Nothing else changes.
- **Different host or builder:** in GoDaddy, point the `www` CNAME and the `@` A record at the new host. Leave the email (MX) records alone.

## 8. After going live

- Google Business Profile: keep the website set to `https://www.conceptscalicut.com`.
- Put the website link in your Instagram and Facebook bios and your WhatsApp Business profile.
- Add the site in **Google Search Console** (search.google.com/search-console) so Google indexes it faster.
