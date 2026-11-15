import {LockKeyhole} from 'lucide-react';
import {Link} from '@tanstack/react-router';
import {Button} from '@/components/ui/button';
import {accountPaths} from '@/lib/customer/validation';
import {useEffect} from 'react';
import {trackEvent} from '@/lib/analytics';
export function LockedResult({sq}:{sq:boolean}){const p=accountPaths(sq);useEffect(()=>{trackEvent('calculator_locked_viewed',{locale:sq?'sq':'en'});},[sq]);return <div className="rounded-lg border border-border bg-card p-6 shadow-card" data-calculator-locked><LockKeyhole className="h-8 w-8 text-primary" aria-hidden="true"/><h3 className="mt-4 text-secondary">{sq?'Krijoni një llogari falas për të parë çmimin':'Create a free account to see your price'}</h3><p className="mt-3 text-sm text-muted-foreground">{sq?'Zgjat më pak se një minutë. Zgjedhjet tuaja ruhen.':'It takes under a minute. Your selections are kept.'}</p><div className="mt-6 grid gap-3"><Button asChild><Link to={p.signup}>{sq?'Krijo llogari falas':'Create free account'}</Link></Button><Button asChild variant="outline"><Link to={p.signin}>{sq?'Hyr':'Sign in'}</Link></Button></div></div>;}
