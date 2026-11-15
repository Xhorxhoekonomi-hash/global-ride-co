import {createFileRoute} from '@tanstack/react-router';
import {AccountPage} from '@/components/account/AccountPage';
import {buildHead} from '@/lib/seo';
export const Route=createFileRoute('/account_/reset-password')({head:()=>buildHead({title:'Reset password | Alpha Worldwide',description:'Manage your Alpha Worldwide customer account.',path:'/account/reset-password',lang:'en',robots:'noindex, nofollow',hreflang:[{lang:'en',path:'/account/reset-password'},{lang:'sq',path:'/al/llogaria/rivendos-fjalekalimin'}]}),component:()=> <AccountPage sq={false} mode="reset"/>});
