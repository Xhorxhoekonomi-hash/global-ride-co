import {createServerFn} from '@tanstack/react-start';
import {requireSupabaseAuth} from '@/integrations/supabase/auth-middleware';
import {profileSchema,quoteSchema} from './validation';
import {z} from 'zod';
export const getCustomerProfile=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const {data,error}=await context.supabase.from('profiles').select('*').eq('id',context.userId).maybeSingle();if(error)throw error;return data;
});
export const updateCustomerProfile=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(v=>profileSchema.parse(v)).handler(async({context,data})=>{
 const {error}=await context.supabase.from('profiles').update(data).eq('id',context.userId);if(error)throw error;return {ok:true};
});
export const getQuote=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(v=>quoteSchema.parse(v)).handler(async({context,data})=>{
 const {data:auth,error}=await context.supabase.auth.getUser();if(error||!auth.user?.email_confirmed_at)throw new Error('Confirm your email first');
 const {data:profile}=await context.supabase.from('profiles').select('id').eq('id',context.userId).maybeSingle();if(!profile)throw new Error('Complete your customer profile first');
 const {calculateUsa,calculateKorea}=await import('./calculate.server');
 const result=data.tab==='usa'?calculateUsa(data.inputs):calculateKorea(data.inputs);
 const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
 const fingerprint=JSON.stringify(data.inputs);
 const {error:saveError}=await supabaseAdmin.from('calculator_quotes').upsert({user_id:context.userId,tab:data.tab,inputs:data.inputs,result,total:'totalUsd' in result?result.totalUsd:result.totalEur,currency:data.tab==='usa'?'USD':'EUR',input_fingerprint:fingerprint},{onConflict:'user_id,tab,input_fingerprint',ignoreDuplicates:true});
 if(saveError)throw saveError;return {tab:data.tab,result};
});
export const koreaMethodPrices=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(v=>z.object({type:z.enum(['Sedan/Coupe','SUV/Minivan','Oversized'])}).parse(v)).handler(async({context,data})=>{
 const {data:auth}=await context.supabase.auth.getUser();if(!auth.user?.email_confirmed_at)throw new Error('Confirm your email first');
 const {getKoreaShipping}=await import('@/data/koreaShipping');return {roro:getKoreaShipping('Albania',data.type,'roro'),container:getKoreaShipping('Albania',data.type,'container')};
});
export const customerEmails=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const {data:auth}=await context.supabase.auth.getUser();if(!auth.user?.email_confirmed_at)return {ok:false};
 const {data:p,error}=await context.supabase.from('profiles').select('*').eq('id',context.userId).maybeSingle();if(error||!p)return {ok:false};
 const {sendTemplateEmail}=await import('@/lib/email-templates/send-email');
 const outcomes=await Promise.allSettled([sendTemplateEmail('welcome',auth.user.email??p.email,{templateData:p,idempotencyKey:`welcome-${context.userId}`}),sendTemplateEmail('new-account','',{templateData:p,idempotencyKey:`new-account-${context.userId}`})]);
 return {ok:outcomes.every(r=>r.status==='fulfilled')};
});
export const deleteCustomerAccount=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(v=>z.object({confirm:z.literal('DELETE')}).parse(v)).handler(async({context})=>{
 const {data:staff}=await context.supabase.from('staff_users').select('user_id').eq('user_id',context.userId).maybeSingle();if(staff)throw new Error('Staff accounts cannot be deleted here');
 const {data:p}=await context.supabase.from('profiles').select('id').eq('id',context.userId).maybeSingle();if(!p)throw new Error('Customer account required');
 const {supabaseAdmin}=await import('@/integrations/supabase/client.server');const {error}=await supabaseAdmin.auth.admin.deleteUser(context.userId);if(error)throw error;return {ok:true};
});
export const listCustomers=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const {data:staff}=await context.supabase.from('staff_users').select('user_id').eq('user_id',context.userId).maybeSingle();if(!staff)throw new Error('Staff access required');
 const [{data:profiles,error},{data:quotes,error:qe}]=await Promise.all([context.supabase.from('profiles').select('*').order('created_at',{ascending:false}),context.supabase.from('calculator_quotes').select('*').order('created_at',{ascending:false})]);if(error||qe)throw error??qe;
 const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
 return await Promise.all((profiles??[]).map(async p=>{const {data:a}=await supabaseAdmin.auth.admin.getUserById(p.id);const qq=(quotes??[]).filter(q=>q.user_id===p.id);return {...p,email_confirmed:Boolean(a.user?.email_confirmed_at),quote_count:qq.length,quotes:qq,last_quote:qq[0]?`${qq[0].tab} · ${JSON.stringify(qq[0].inputs)} · ${qq[0].total} ${qq[0].currency}`:''};}));
});
