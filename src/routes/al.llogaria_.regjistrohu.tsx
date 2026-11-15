import {createFileRoute} from '@tanstack/react-router';
import {AccountPage} from '@/components/account/AccountPage';
import {buildHead} from '@/lib/seo';
export const Route=createFileRoute('/al/llogaria_/regjistrohu')({head:()=>buildHead({title:'Krijo llogari falas | Alpha Worldwide',description:'Menaxhoni llogarinë tuaj Alpha Worldwide.',path:'/al/llogaria/regjistrohu',lang:'sq',robots:'noindex, nofollow',hreflang:[{lang:'en',path:'/account/sign-up'},{lang:'sq',path:'/al/llogaria/regjistrohu'}]}),component:()=> <AccountPage sq={true} mode="signup"/>});
