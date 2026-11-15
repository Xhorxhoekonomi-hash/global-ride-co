import {createFileRoute} from '@tanstack/react-router';
import {AccountPage} from '@/components/account/AccountPage';
import {buildHead} from '@/lib/seo';
export const Route=createFileRoute('/al/llogaria')({head:()=>buildHead({title:'Llogaria juaj | Alpha Worldwide',description:'Menaxhoni llogarinë tuaj Alpha Worldwide.',path:'/al/llogaria',lang:'sq',robots:'noindex, nofollow',hreflang:[{lang:'en',path:'/account'},{lang:'sq',path:'/al/llogaria'}]}),component:()=> <AccountPage sq={true} mode="account"/>});
