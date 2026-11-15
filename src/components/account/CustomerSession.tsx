import {createContext,useCallback,useContext,useEffect,useState,type ReactNode} from 'react';
import type {User} from '@supabase/supabase-js';
import {supabase} from '@/integrations/supabase/client';
import {useRouter} from '@tanstack/react-router';
import {useQueryClient} from '@tanstack/react-query';
import {customerEmails,getCustomerProfile} from '@/lib/customer/customer.functions';
type Ctx={user:User|null;loading:boolean;hasProfile:boolean|null;refreshProfile:()=>Promise<void>};
const CustomerContext=createContext<Ctx>({user:null,loading:true,hasProfile:null,refreshProfile:async()=>{}});
export function CustomerSession({children}:{children:ReactNode}) {
 const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);const [hasProfile,setHasProfile]=useState<boolean|null>(null);const router=useRouter();const queryClient=useQueryClient();
 useEffect(()=>{let active=true;const refresh=async()=>{const {data}=await supabase.auth.getUser();if(active){setUser(data.user);setLoading(false);document.documentElement.dataset.customerReady="true";}};void refresh();const {data:listener}=supabase.auth.onAuthStateChange(event=>{if(!['SIGNED_IN','SIGNED_OUT','USER_UPDATED','PASSWORD_RECOVERY'].includes(event))return;if(event==='SIGNED_OUT'){setUser(null);setHasProfile(null);queryClient.clear();}else void refresh();void router.invalidate();});return()=>{active=false;listener.subscription.unsubscribe();};},[router,queryClient]);
 const refreshProfile=useCallback(async()=>{const v=await getCustomerProfile().catch(()=>null);setHasProfile(Boolean(v));},[]);
 useEffect(()=>{setHasProfile(null);if(!user?.email_confirmed_at)return;void refreshProfile();},[user?.id,user?.email_confirmed_at,refreshProfile]);
 // Welcome + owner emails once a confirmed user has a profile (email or Google sign-up); per-user idempotency keys dedupe.
 useEffect(()=>{if(!user?.email_confirmed_at||hasProfile!==true)return;void customerEmails().catch(()=>{});},[user?.id,user?.email_confirmed_at,hasProfile]);
 return <CustomerContext.Provider value={{user,loading,hasProfile,refreshProfile}}>{children}</CustomerContext.Provider>;
}
export const useCustomer=()=>useContext(CustomerContext);
