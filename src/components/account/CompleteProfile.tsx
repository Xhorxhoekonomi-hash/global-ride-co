import {useState} from 'react';
import {Link} from '@tanstack/react-router';
import {Button} from '@/components/ui/button';
import {useCustomer} from './CustomerSession';
import {countries,countryLabel} from '@/lib/customer/countries';
import {consentText} from '@/lib/customer/validation';
import {completeCustomerProfile} from '@/lib/customer/customer.functions';
import {trackEvent} from '@/lib/analytics';
/** Shown to signed-in users without a customer profile (e.g. first Google sign-in). */
export function CompleteProfile({sq}:{sq:boolean}){
 const {user,refreshProfile}=useCustomer();const t=(en:string,al:string)=>sq?al:en;
 const [phone,setPhone]=useState('+355'),[country,setCountry]=useState('Albania'),[privacy,setPrivacy]=useState(false),[consent,setConsent]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setError('');try{await completeCustomerProfile({data:{phone,country,privacy_accepted:privacy as true,marketing_consent:consent,locale:sq?'sq':'en'}});trackEvent('account_created',{locale:sq?'sq':'en',method:'google'});await refreshProfile();}catch(err){setError(err instanceof Error&&/staff/i.test(err.message)?t('Staff accounts cannot use customer profiles.','Llogaritë e stafit nuk mund të përdorin profile klientësh.'):t('Check your phone number (with country code) and tick the agreement box.','Kontrolloni numrin e telefonit (me kodin e shtetit) dhe shënoni pranimin.'));}finally{setBusy(false);}}
 return <div className="rounded-lg border border-border bg-card p-6 shadow-card" data-complete-profile><h3 className="text-secondary">{t('Complete your profile','Plotësoni profilin')}</h3><p className="mt-3 text-sm text-muted-foreground">{t('One last step before your price. Your selections are kept.','Një hap i fundit para çmimit. Zgjedhjet tuaja ruhen.')}</p>{user?.email&&<p className="mt-2 break-all text-sm">{user.email}</p>}
 {error&&<p role="alert" className="mt-4 text-destructive">{error}</p>}
 <form className="mt-5 grid gap-5" onSubmit={submit}><label className="grid gap-2"><span className="form-label">{t('Phone / WhatsApp (country code)','Telefon / WhatsApp (kodi i shtetit)')}</span><input className="form-control" required type="tel" autoComplete="tel" value={phone} onChange={e=>setPhone(e.target.value)}/></label>
 <label className="grid gap-2"><span className="form-label">{t('Country','Shteti')}</span><select className="form-control" value={country} onChange={e=>setCountry(e.target.value)}>{countries.map(c=><option key={c} value={c}>{countryLabel(c,sq)}</option>)}</select></label>
 <label className="flex items-start gap-3 text-sm"><input required type="checkbox" className="mt-1 h-5 w-5" checked={privacy} onChange={e=>setPrivacy(e.target.checked)}/><span>{t('I agree to the','Pranoj')} <Link to={sq?'/al/politika-e-privatesise':'/privacy-policy'} className="text-primary underline">{t('Privacy Policy','Politikën e privatësisë')}</Link> {t('and','dhe')} <Link to={sq?'/al/kushtet-e-sherbimit':'/terms'} className="text-primary underline">{t('Terms','Kushtet')}</Link>.</span></label>
 <label className="flex items-start gap-3 text-sm"><input type="checkbox" className="mt-1 h-5 w-5" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>{consentText(sq?'sq':'en')}</span></label>
 <Button type="submit" disabled={busy}>{busy?t('Please wait…','Ju lutem prisni…'):t('Save and see price','Ruaj dhe shiko çmimin')}</Button></form></div>;
}
