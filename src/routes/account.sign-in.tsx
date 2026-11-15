import {createFileRoute} from '@tanstack/react-router';
import {AccountPage} from '@/components/account/AccountPage';
import {buildHead} from '@/lib/seo';
export const Route=createFileRoute('/account/sign-in')({head:()=>buildHead({title:'Sign in | Alpha Worldwide',description:'Manage your Alpha Worldwide customer account.',path:'/account/sign-in',lang:'en',robots:'noindex, nofollow',hreflang:[{lang:'en',path:'/account/sign-in'},{lang:'sq',path:'/al/llogaria/hyr'}]}),component:()=> <AccountPage sq={false} mode="signin"/>});
