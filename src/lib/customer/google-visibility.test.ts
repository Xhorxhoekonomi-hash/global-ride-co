import {test} from 'node:test';
import assert from 'node:assert/strict';
import {renderToStaticMarkup} from 'react-dom/server';
import {createElement} from 'react';
import {GOOGLE_SIGN_IN_ENABLED} from './feature-flags';
import {GoogleButton,GoogleButtonMarkup} from '@/components/account/GoogleButton';

// Shim matching the other customer tests: node:test has no expect().
function expect(v:unknown){return {toBe:(x:unknown)=>assert.equal(v,x),toContain:(x:string)=>assert.ok(String(v).includes(x)),not:{toContain:(x:string)=>assert.ok(!String(v).includes(x)),toMatch:(r:RegExp)=>assert.ok(!r.test(String(v)))}};}

const button=(sq:boolean)=>renderToStaticMarkup(createElement(GoogleButton,{sq,signup:false,onError:()=>{}}));

test('Google sign-in is currently hidden from customers',()=>{expect(GOOGLE_SIGN_IN_ENABLED).toBe(false);});

test('the Google button and its divider are not rendered while the flag is false',()=>{
 for(const sq of [false,true]){const html=button(sq);
  expect(html).toBe('');
  expect(html).not.toContain('google-btn');
  expect(html).not.toContain('auth-divider');
  expect(html).not.toContain(sq?'Vazhdo me Google':'Continue with Google');
  expect(html).not.toContain(sq?'ose':'or');
 }
});

test('the same component does render button and divider when the flag is true',()=>{
 const en=renderToStaticMarkup(createElement(GoogleButtonMarkup,{sq:false,busy:false,onGo:()=>{}}));
 const al=renderToStaticMarkup(createElement(GoogleButtonMarkup,{sq:true,busy:false,onGo:()=>{}}));
 expect(en).toContain('Continue with Google');expect(en).toContain('google-btn');expect(en).toContain('auth-divider');
 expect(al).toContain('Vazhdo me Google');expect(al).toContain('ose');
});
