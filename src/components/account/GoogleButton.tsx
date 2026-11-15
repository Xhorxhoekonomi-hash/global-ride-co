import {useState} from 'react';
import {lovable} from '@/integrations/lovable/index';
import {accountPaths} from '@/lib/customer/validation';
import {trackEvent} from '@/lib/analytics';
const G = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.090 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.270 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>';
export function GoogleButton({sq,signup,onError}:{sq:boolean;signup:boolean;onError:(m:string)=>void}){
 const [busy,setBusy]=useState(false);
 async function go(){setBusy(true);onError('');if(signup)trackEvent('account_signup_started',{locale:sq?'sq':'en',method:'google'});
  const r=await lovable.auth.signInWithOAuth('google',{redirect_uri:window.location.origin+accountPaths(sq).calculator});
  if(r.error){onError(sq?'Hyrja me Google nuk u krye. Provoni përsëri.':'Google sign-in did not complete. Please try again.');setBusy(false);return;}
  if(r.redirected)return;
  trackEvent('account_signed_in',{locale:sq?'sq':'en',method:'google'});window.location.assign(accountPaths(sq).calculator);}
 return <div className="mt-8"><button type="button" className="google-btn" disabled={busy} onClick={go}><span aria-hidden="true" className="h-[18px] w-[18px] shrink-0" dangerouslySetInnerHTML={{__html:G}}/><span>{sq?'Vazhdo me Google':'Continue with Google'}</span></button><div className="auth-divider">{sq?'ose':'or'}</div></div>;
}
