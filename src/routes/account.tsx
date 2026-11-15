import {createFileRoute} from '@tanstack/react-router';
import {AccountPage} from '@/components/account/AccountPage';
import {buildHead} from '@/lib/seo';
export const Route=createFileRoute('/account')({head:()=>buildHead({title:'Your account | Alpha Worldwide',description:'Manage your Alpha Worldwide customer account.',path:'/account',lang:'en',robots:'noindex, nofollow',hreflang:[{lang:'en',path:'/account'},{lang:'sq',path:'/al/llogaria'}]}),component:()=> <AccountPage sq={false} mode="account"/>});
