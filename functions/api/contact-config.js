export async function onRequestGet({env}) {
  const enabled = Boolean(env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY && env.RESEND_API_KEY && env.CONTACT_TO && env.CONTACT_FROM);
  return Response.json({enabled,siteKey: enabled ? env.TURNSTILE_SITE_KEY : null},{headers:{'Cache-Control':'no-store'}});
}
