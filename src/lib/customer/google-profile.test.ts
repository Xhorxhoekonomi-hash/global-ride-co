import {test} from 'node:test';
import assert from 'node:assert/strict';
import {completeProfileSchema,nameFromIdentity} from './validation';
import {countries,countryLabel} from './countries';
test('Google profile completion requires the Privacy/Terms box', () => {
  const base={phone:'+355692233416',country:'Albania',marketing_consent:false,locale:'sq' as const};
  assert.throws(()=>completeProfileSchema.parse({...base,privacy_accepted:false}));
  assert.equal(completeProfileSchema.parse({...base,privacy_accepted:true}).marketing_consent,false);
  assert.throws(()=>completeProfileSchema.parse({...base,phone:'0692233416',privacy_accepted:true}));
});
test('profile name comes from Google, falling back to the email', () => {
  assert.equal(nameFromIdentity(' Ana Hoxha ','x@y.com'),'Ana Hoxha');
  assert.equal(nameFromIdentity(undefined,'ana.hoxha@gmail.com'),'ana.hoxha');
});
test('SQ country labels are localized while stored values stay English', () => {
  assert.equal(countryLabel('Albania',true),'Shqipëri');
  assert.equal(countryLabel('Albania',false),'Albania');
  for (const c of countries) assert.notEqual(countryLabel(c,true),c);
});
