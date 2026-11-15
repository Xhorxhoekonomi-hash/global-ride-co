import {createFileRoute} from '@tanstack/react-router';
import {AccountPage} from '@/components/account/AccountPage';
import {buildHead} from '@/lib/seo';
export const Route=createFileRoute('/al/llogaria/hyr')({head:()=>buildHead({title:'Hyr | Alpha Worldwide',description:'Menaxhoni llogarinë tuaj Alpha Worldwide.',path:'/al/llogaria/hyr',lang:'sq',robots:'noindex, nofollow',hreflang:[{lang:'en',path:'/account/sign-in'},{lang:'sq',path:'/al/llogaria/hyr'}]}),component:()=> <AccountPage sq={true} mode="signin"/>});
