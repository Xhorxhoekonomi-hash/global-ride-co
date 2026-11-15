import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import type {User} from '@supabase/supabase-js';
import {supabase} from '@/integrations/supabase/client';
import {useRouter} from '@tanstack/react-router';
import {useQueryClient} from '@tanstack/react-query';
import {customerEmails} from '@/lib/customer/customer.functions';
const CustomerContext=createContext<{user:User|null;loading:boolean}>({user:null,loading:true});
export function CustomerSession({children}:{children:ReactNode}) {
 const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);const router=useRouter();const queryClient=useQueryClient();
 useEffect(()=>{let active=true;const refresh=async()=>{const {data}=await supabase.auth.getUser();if(active){setUser(data.user);setLoading(false);document.documentElement.dataset.customerReady="true";}};void refresh();const {data:listener}=supabase.auth.onAuthStateChange(event=>{if(!['SIGNED_IN','SIGNED_OUT','USER_UPDATED','PASSWORD_RECOVERY'].includes(event))return;if(event==='SIGNED_OUT'){setUser(null);queryClient.clear();}else void refresh();void router.invalidate();});return()=>{active=false;listener.subscription.unsubscribe();};},[router,queryClient]);
 useEffect(()=>{if(!user?.email_confirmed_at)return;void customerEmails().catch(()=>{});},[user?.id,user?.email_confirmed_at]);
 return <CustomerContext.Provider value={{user,loading}}>{children}</CustomerContext.Provider>;
}
export const useCustomer=()=>useContext(CustomerContext);
