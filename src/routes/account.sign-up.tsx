import {createFileRoute} from '@tanstack/react-router';
import {AccountPage} from '@/components/account/AccountPage';
import {buildHead} from '@/lib/seo';
export const Route=createFileRoute('/account/sign-up')({head:()=>buildHead({title:'Create free account | Alpha Worldwide',description:'Manage your Alpha Worldwide customer account.',path:'/account/sign-up',lang:'en',robots:'noindex, nofollow',hreflang:[{lang:'en',path:'/account/sign-up'},{lang:'sq',path:'/al/llogaria/regjistrohu'}]}),component:()=> <AccountPage sq={false} mode="signup"/>});
