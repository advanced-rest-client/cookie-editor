import { fixture, assert, nextFrame } from '@open-wc/testing';
import * as sinon from 'sinon/pkg/sinon-esm.js';
import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';
import '../cookie-editor.js';

describe('<cookie-editor>', function() {
  async function basicFixture() {
    return (await fixture(`<cookie-editor></cookie-editor>`));
  }

  describe('empty editor', () => {
    const name = 'test-name';
    const value = 'test-value';
    const domain = 'test-domain';
    const path = 'test-path';
    const exp = 1508510400000;

    const dummyEvent = new CustomEvent('test', {}, {
      cancelable: true
    });

    let element;
    beforeEach(async function() {
      element = await basicFixture();
    });

    it('does not passes validation', function() {
      const validated = element.form.validate();
      assert.isFalse(validated);
    });

    it('does not sends save event', function() {
      const spy = sinon.spy();
      element.addEventListener('save', spy);
      element._save();
      assert.isFalse(spy.called);
    });

    it('sends save event for minimum required', async function() {
      const spy = sinon.spy();
      element.addEventListener('save', spy);
      const cookie = {
        name: name,
        domain: domain,
        path: path
      };
      element.cookie = cookie;
      await nextFrame();
      element._save();
      assert.isTrue(spy.calledOnce);
    });

    it('the event contains form properties', async function() {
      const spy = sinon.spy();
      element.addEventListener('save', spy);
      const cookie = {
        name: name,
        domain: domain,
        path: path,
        value: value,
        expires: exp,
        hostOnly: true,
        httpOnly: true,
        secure: true,
        session: true
      };
      element.cookie = cookie;
      await nextFrame();
      element._formSubmit(dummyEvent);
      const eventData = spy.args[0][0].detail;
      assert.typeOf(eventData, 'object');
      assert.equal(eventData.name, name);
      assert.equal(eventData.domain, domain);
      assert.equal(eventData.value, value);
      assert.typeOf(eventData.expires, 'number');
      assert.isTrue(eventData.hostOnly);
      assert.isTrue(eventData.httpOnly);
      assert.isTrue(eventData.secure);
      assert.isTrue(eventData.session);
    });

    it('cancel button fires cancel custom event', function() {
      const spy = sinon.spy();
      element.addEventListener('cancel', spy);
      const button = element.shadowRoot.querySelector('[data-action="cancel-action"]');
      MockInteractions.tap(button);
      assert.isTrue(spy.calledOnce);
    });

    it('Save button send save event', async function() {
      const spy = sinon.spy();
      element.addEventListener('save', spy);
      const cookie = {
        name: name,
        domain: domain,
        path: path
      };
      element.cookie = cookie;
      await nextFrame();
      const button = element.shadowRoot.querySelector('[data-action="save-action"]');
      MockInteractions.tap(button);
      assert.isTrue(spy.calledOnce);
    });
  });

  describe('_convertTime()', function() {
    const pattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/;
    let element;
    beforeEach(async function() {
      element = await basicFixture();
    });

    it('Converts current time', function() {
      const result = element._convertTime(Date.now());
      assert.isTrue(pattern.test(result));
    });

    it('Has 0-pads', function() {
      const d = new Date();
      d.setDate(1);
      d.setMonth(1);
      d.setHours(1);
      d.setMinutes(1);
      const result = element._convertTime(d.getTime());
      assert.isTrue(pattern.test(result));
    });
  });
});
