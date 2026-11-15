import {test} from 'node:test';
import assert from 'node:assert/strict';
import {renderToStaticMarkup} from 'react-dom/server';
import {createElement} from 'react';
import {GoogleButton} from '@/components/account/GoogleButton';

test('scratch: google button module imports and renders', () => {
  const html = renderToStaticMarkup(createElement(GoogleButton, {sq: false, signup: false, onError: () => {}}));
  console.log('SCRATCH-HTML-START' + html + 'SCRATCH-HTML-END');
  assert.ok(typeof html === 'string');
});
