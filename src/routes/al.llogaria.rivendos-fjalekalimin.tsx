import {createFileRoute} from '@tanstack/react-router';
import {AccountPage} from '@/components/account/AccountPage';
import {buildHead} from '@/lib/seo';
export const Route=createFileRoute('/al/llogaria/rivendos-fjalekalimin')({head:()=>buildHead({title:'Rivendos fjalëkalimin | Alpha Worldwide',description:'Menaxhoni llogarinë tuaj Alpha Worldwide.',path:'/al/llogaria/rivendos-fjalekalimin',lang:'sq',robots:'noindex, nofollow',hreflang:[{lang:'en',path:'/account/reset-password'},{lang:'sq',path:'/al/llogaria/rivendos-fjalekalimin'}]}),component:()=> <AccountPage sq={true} mode="reset"/>});
