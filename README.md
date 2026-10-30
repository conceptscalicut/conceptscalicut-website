# conceptscalicut.com

Website for Concepts Interiors & Home Decor, Kozhikode. Hosted on Netlify (project `conceptscalicut`).

| Folder | What it is |
|---|---|
| `site/` | Homepage source (`index.html`), editable content (`content.js`: contact details, projects, products, featured product, reviews), images and media |
| `blog/posts/` | Blog posts, one Markdown file each. Edited by the team at https://www.conceptscalicut.com/admin/ |
| `build/` | Python build that turns `site/` and `blog/` into the finished website in `dist/` |
| `admin/` | The blog editor (Decap CMS) |
| `scripts/` | Publish rules for Netlify and the Monday publish + newsletter job |

## How publishing works
- Saving a post in the editor stores it here. It does **not** go live by itself (each Netlify deploy uses free-plan credits).
- **Every Monday ~8:45 am IST** a GitHub Action publishes everything approved (Draft unticked, date today or earlier) and emails new posts to the Brevo "Website Subscribers" list.
- **Publish now:** tick *Publish immediately* on the post, or GitHub > Actions > "Publish blog and send newsletter" > Run workflow.
- Website code changes go live when the commit message contains `[publish]`.

## Build locally
```
pip install -r requirements.txt
python3 build/build.py      # needs Node.js too (reads site/content.js)
```

## Social
WhatsApp Channel: https://whatsapp.com/channel/0029Vagc6QdAYlUFE0jaHE2u
