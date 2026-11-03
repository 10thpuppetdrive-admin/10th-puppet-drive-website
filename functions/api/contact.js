// Cloudflare Pages Function: POST /api/contact
const json = (data, status=200) => Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function onRequestPost({request,env}) {
  if(!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) return json({error:'Contact form not configured.'},503);
  if(env.SITE_ORIGIN && request.headers.get('Origin') && request.headers.get('Origin') !== env.SITE_ORIGIN) return json({error:'Invalid origin.'},403);
  const length=Number(request.headers.get('Content-Length')||'0');
  if(length>20000)return json({error:'Message too large.'},413);
  let f;
  try{f=await request.formData();}catch{return json({error:'Invalid form submission.'},400);}
  const get=k=>String(f.get(k)||'').trim();
  if(get('website'))return json({ok:true}); // honeypot
  const name=get('name'), email=get('email'), topic=get('topic'), message=get('message'), token=get('cf-turnstile-response');
  if(!name||name.length>100||!email||email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!message||message.length<10||message.length>5000||!['General message','Collaboration','Business inquiry'].includes(topic)||!token) return json({error:'Please check the form fields and verification.'},400);
  const remoteip=request.headers.get('CF-Connecting-IP')||undefined;
  let verification;
  try{
    const v=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:token,remoteip})});
    verification=await v.json();
  }catch{return json({error:'Unable to verify the submission. Please try again.'},502);}
  if(!verification.success)return json({error:'Spam verification failed. Please retry.'},403);
  const safeText=s=>s.replace(/[\u0000-\u001f\u007f]/g,' ').slice(0,5000);
  const body=['New 10th Puppet Drive website message','Name: '+safeText(name),'Email: '+safeText(email),'Topic: '+topic,'','Message:',safeText(message)].join('\n');
  try{
    const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{'Authorization':'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:env.CONTACT_FROM,to:[env.CONTACT_TO],reply_to:email,subject:'Website contact: '+topic,text:body})});
    if(!response.ok){console.error('Email provider error status',response.status);return json({error:'Message delivery unavailable. Please try again later.'},502);}
    return json({ok:true});
  }catch{return json({error:'Message delivery unavailable. Please try later.'},502);}
}
