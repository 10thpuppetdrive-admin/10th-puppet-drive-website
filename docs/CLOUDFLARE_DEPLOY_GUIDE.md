# Deploy guide (proposal, not deployed)

This site is prepared for **Cloudflare Pages** with **Pages Functions** and a Resend email API, but no external accounts, DNS or secrets have been configured here.

1. Decide whether to use Git integration or Wrangler. For local direct upload with Pages Functions, use Wrangler; dashboard drag-and-drop currently does not compile a `functions` folder.
2. Create a Cloudflare Pages project, and ensure this project folder is the deployed static root (contains `index.html` and `assets/`), while `functions/` is at project root.
3. Add a Turnstile widget for the real hostname and any preview hostnames used for testing.
4. Configure variables/secrets in Pages settings: `TURNSTILE_SITE_KEY` (public widget ID), `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`. Optional `SITE_ORIGIN` must match the browser origin exactly, including `www` handling.
5. Verify your sender domain in Resend first; do not use an unverified `CONTACT_FROM`.
6. Test the live `/api/contact-config` endpoint: enabled=false is expected until every key is set. It must return no email/secret.
7. Submit a genuine test message. Verify Gmail inbox delivery and the reply-to behavior. Check Turnstile and error handling.
8. Connect the `.com` domain and set HTTPS plus canonical redirect rules. Then redirect `.tv` and `.show` to `.com` using the DNS/registrar or hosting redirection service.
9. Add the approved banner, replace Tailwind CDN with compiled CSS, finalize privacy details, and re-test before publishing.

Official docs:
- https://developers.cloudflare.com/pages/get-started/direct-upload/
- https://developers.cloudflare.com/pages/functions/get-started/
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
