import {Body,Container,Head,Heading,Html,Text} from '@react-email/components';
import type {TemplateEntry} from './registry';
function Notice(p:Record<string,unknown>){return <Html><Head/><Body style={{backgroundColor:'#ffffff',fontFamily:'Arial,sans-serif'}}><Container style={{padding:'32px'}}><Heading>New account — Alpha Worldwide</Heading>{['full_name','email','phone','country','locale','marketing_consent'].map(k=><Text key={k}>{k.replaceAll('_',' ')}: {typeof p[k]==='boolean'?(p[k]?'Yes':'No'):String(p[k]??'')}</Text>)}</Container></Body></Html>;}
export const template={component:Notice,subject:'New customer account — Alpha Worldwide',to:'info@alphaworldwidealbania.com',displayName:'New customer account'} satisfies TemplateEntry;
