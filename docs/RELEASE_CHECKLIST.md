# 10th Puppet Drive — Pre-launch checklist (V2.58)

## Verified in the package
- [x] Six episode cards and their video IDs retained from V2.56.
- [x] Header menu includes Home, Characters, Latest Chaos, Fuel the Chaos, Contact.
- [x] Facebook and existing social links are present.
- [x] Main domain assumed: https://10thpuppetdrive.com/ (canonical/social).
- [x] Favicon SVG, 1200×630 social preview, robots.txt, sitemap.xml included.
- [x] Contact form does not expose the recipient email in page source; server code validates a Turnstile token.

## Blocking before public launch
- [x] Approved `Mobi&Torik_banner.jpeg` included beside `index.html` (1600×900).
- [ ] Check image loads at a real deployed URL.
- [ ] Confirm web hosting choice. This bundle has Cloudflare Pages Functions, requiring Git integration or **Wrangler CLI** deployment, not dashboard drag-and-drop.
- [ ] Configure Cloudflare Turnstile: `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, approved hostnames.
- [ ] Configure Resend verified sender domain + `RESEND_API_KEY`, `CONTACT_FROM`; set `CONTACT_TO` privately in hosting variables.
- [ ] Run end-to-end real delivery tests including spam challenge, invalid fields and Reply-To handling.
- [ ] Publish reviewed privacy policy and link it in footer/form before processing personal information.
- [ ] Production CSS build: replace `https://cdn.tailwindcss.com` browser-runtime dependency with a locally generated stylesheet (current file is a visual prototype).
- [ ] Test mobile and desktop layout, navigation, form keyboard flow, images, embedded YouTube playback and external links after hosting.
- [ ] Domain DNS and TLS: attach .com to hosting; 301 redirect .tv and .show; choose www canonical redirect; check SSL.
- [ ] Validate Open Graph previews with social debuggers and confirm image approval.
- [ ] Agree on content/children-privacy/consent handling as applicable before live launch.

## Additional worthwhile checks
- [ ] Verify all episode **titles**, thumbnails and numbering against YouTube, since user is reviewing them.
- [ ] Evaluate using click-to-load YouTube embeds and a privacy-friendly visitor analytics option.
- [ ] Add accessibility smoke tests, performance measurement and cache headers on a published preview.
- [ ] Add and verify Google Search Console property after site is live.
