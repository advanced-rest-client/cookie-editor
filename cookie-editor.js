/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { html, css, LitElement } from 'lit-element';
import { ArcResizableMixin } from '@advanced-rest-client/arc-resizable-mixin/arc-resizable-mixin.js';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import '@anypoint-web-components/anypoint-input/anypoint-input.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import '@polymer/iron-form/iron-form.js';
/**
 * `<cookie-editor>` An element to edit cookie details
 *
 * ### Example
 *
 * ```html
 * <cookie-editor></cookie-editor>
 * ```
 *
 * ### Styling
 *
 * `<cookie-editor>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--arc-font-body1-font-size` | Theme property, body font size | ``
 * `--arc-font-body1-font-weight` | Theme property, body from weight | ``
 * `--arc-font-body1-line-height` | Theme property, body line height | ``
 * `--arc-font-headline-font-size` | Theme property, headline font size | ``
 * `--arc-font-headline-font-weight` | Theme property, headline from weight | ``
 * `--arc-font-headline-line-height` | Theme property, headline line height | ``
 * `--arc-font-headline-letter-spacing` | Theme property, headline letter spacing | ``
 * `--primary-color` | Theme property, button color or action button background color | ``
 * `--primary-action-color` | Theme property, action button color | `#fff`
 *
 * @polymer
 * @customElement
 * @memberof UiElements
 * @polymerBehavior IronResizableBehavior
 */
class CookieEditor extends ArcResizableMixin(LitElement) {
  static get styles() {
    return css`:host {
      display: block;
      outline: none;
      font-size: var(--arc-font-body1-font-size);
      font-weight: var(--arc-font-body1-font-weight);
      line-height: var(--arc-font-body1-line-height);
    }

    form {
      outline: none;
    }

    h2 {
      font-size: var(--arc-font-headline-font-size);
      font-weight: var(--arc-font-headline-font-weight);
      letter-spacing: var(--arc-font-headline-letter-spacing);
      line-height: var(--arc-font-headline-line-height);
    }

    anypoint-input {
      width: 100%;
    }

    anypoint-checkbox {
      display: block;
    }

    .actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 20px;
    }

    .actions paper-button {
      padding-left: 12px;
      padding-right: 12px;
    }`;
  }

  render() {
    const {
      compatibility,
      outlined,
      readOnly,
      _cname,
      _cvalue,
      _cdomain,
      _cpath,
      _cexpires,
      _chostOnly,
      _chttpOnly,
      _csecure,
      _csession
    } = this;
    return html`
    <h2>Edit cookie</h2>
    <iron-form id="form" @iron-form-presubmit="${this._formSubmit}">
      <form method="post">
        <anypoint-input
          id="cname"
          name="name"
          required
          autovalidate
          invalidmessage="Name is required"
          .value="${_cname}"
          ?readonly="${readOnly}"
          ?compatibility="${compatibility}"
          ?outlined="${outlined}"
          @value-changed="${this._valueHandler}">
          <label slot="label">Cookie name (required)</label>
        </anypoint-input>
        <anypoint-input
          name="value"
          id="cvalue"
          .value="${_cvalue}"
          ?readonly="${readOnly}"
          ?compatibility="${compatibility}"
          ?outlined="${outlined}"
          @value-changed="${this._valueHandler}">
          <label slot="label">Value</label>
        </anypoint-input>
        <anypoint-input
          id="cdomain"
          required
          autovalidate
          invalidmessage="Domain is required"
          name="domain"
          .value="${_cdomain}"
          ?readonly="${readOnly}"
          ?compatibility="${compatibility}"
          ?outlined="${outlined}"
          @value-changed="${this._valueHandler}">
          <label slot="label">Domain (required)</label>
        </anypoint-input>
        <anypoint-input
          id="cpath"
          name="path"
          required
          autovalidate
          invalidmessage="Path is required"
          .value="${_cpath}"
          ?readonly="${readOnly}"
          ?compatibility="${compatibility}"
          ?outlined="${outlined}"
          @value-changed="${this._valueHandler}">
          <label slot="label">Path (required)</label>
        </anypoint-input>
        <anypoint-input
          id="cexpires"
          type="datetime-local"
          name="expires"
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
          autovalidate
          .value="${_cexpires}"
          ?readonly="${readOnly}"
          ?compatibility="${compatibility}"
          ?outlined="${outlined}"
          @value-changed="${this._valueHandler}">
          <label slot="label">Expires</label>
        </anypoint-input>
        <anypoint-checkbox
          name="hostOnly"
          id="chostOnly"
          .checked="${_chostOnly}"
          ?disabled="${readOnly}"
          ?compatibility="${compatibility}"
          @checked-changed="${this._checkedHandler}">Host only</anypoint-checkbox>
        <anypoint-checkbox
          name="httpOnly"
          id="chttpOnly"
          .checked="${_chttpOnly}"
          ?disabled="${readOnly}"
          ?compatibility="${compatibility}"
          @checked-changed="${this._checkedHandler}">HTTP only</anypoint-checkbox>
        <anypoint-checkbox
          name="secure" id="csecure"
          .checked="${_csecure}"
          ?disabled="${readOnly}"
          ?compatibility="${compatibility}"
          @checked-changed="${this._checkedHandler}">Secure</anypoint-checkbox>
        <anypoint-checkbox
          name="session"
          id="csession"
          .checked="${_csession}"
          ?disabled="${readOnly}"
          ?compatibility="${compatibility}"
          @checked-changed="${this._checkedHandler}">Session</anypoint-checkbox>
      </form>
    </iron-form>
    <div class="actions">
      <anypoint-button
        @click="${this._cancel}"
        ?readonly="${readOnly}"
        ?compatibility="${compatibility}"
        data-action="cancel-action">Cancel</anypoint-button>
      <anypoint-button
        @click="${this._save}"
        data-action="save-action"
        ?readonly="${readOnly}"
        ?compatibility="${compatibility}"
        class="action-button">Save</anypoint-button>
    </div>`;
  }

  static get properties() {
    return {
      /**
       * Currently existing cookie.
       * Values of this propertue will not going to be changed.
       * All new values are sent only in the `save-cookie` event
       */
      cookie: { type: Object },
      /**
       * When set the editor is in read only mode.
       */
      readOnly: { type: Boolean },
      /**
       * Enables outlined theme.
       */
      outlined: { type: Boolean, reflect: true },
      /**
       * Enables compatibility with Anypoint components.
       */
      compatibility: { type: Boolean, reflect: true },

      _cname: { type: String },
      _cvalue: { type: String },
      _cdomain: { type: String },
      _cpath: { type: String },
      _cexpires: { type: String },
      _chostOnly: { type: Boolean },
      _chttpOnly: { type: Boolean },
      _csecure: { type: Boolean },
      _csession: { type: Boolean }
    };
  }

  get form() {
    return this.shadowRoot.querySelector('iron-form');
  }

  get cookie() {
    return this._cookie;
  }

  set cookie(value) {
    const old = this._cookie;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this._cookie = value;
    this._cookieChanged(value);
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '-1');
    }
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'dialog');
    }
  }
  /**
   * Updates state of the UI constrols depending on existing cookie value
   * @param {Object} value Cookie to render
   */
  _cookieChanged(value) {
    if (!value) {
      value = {};
    }
    this._cname = value.name || '';
    this._cvalue = value.value || '';
    this._cdomain = value.domain || '';
    this._cpath = value.path || '';
    this._chostOnly = value.hostOnly === true ? true : false;
    this._chttpOnly = value.httpOnly === true ? true : false;
    this._csecure = value.secure === true ? true : false;
    this._csession = value.session === true ? true : false;
    const exp = this._convertTime(value.expires);
    this._cexpires = exp || '';
  }

  /**
   * Sends the `cancel-cookie-edit` custom event to cancel the edit.
   */
  _cancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }
  /**
   * Sets `override` to `false` and sends the form.
   */
  _save() {
    if (!this.form.validate()) {
      return;
    }
    this.form.submit();
  }

  /**
   * Sends the `save-request` custom event with computed detail object.
   *
   * @param {CustomEvent} e
   */
  _formSubmit(e) {
    e.preventDefault();
    const values = this.form.serializeForm();
    if (!('hostOnly' in values)) {
      values.hostOnly = false;
    } else {
      values.hostOnly = true;
    }
    if (!('httpOnly' in values)) {
      values.httpOnly = false;
    } else {
      values.httpOnly = true;
    }
    if (!('secure' in values)) {
      values.secure = false;
    } else {
      values.secure = true;
    }
    if (!('session' in values)) {
      values.session = false;
    } else {
      values.session = true;
    }

    const d = new Date(values.expires);
    if (isNaN(d)) {
      delete values.expires;
    } else {
      values.expires = d.getTime();
    }
    this.dispatchEvent(new CustomEvent('save', {
      detail: values
    }));
  }
  /**
   * Converts the timestamp to a formatted date string accepted by the input
   * field.
   * @param {Number} time Timestamp.
   * @return {String} Formatted date or undefined if `time` is not set or
   * invalid.
   */
  _convertTime(time) {
    if (!time) {
      return;
    }
    const d = new Date(time);
    if (isNaN(d)) {
      return;
    }
    let result = d.getFullYear() + '-';
    let month = d.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    result += month + '-';
    let day = d.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    result += day + 'T';
    let h = d.getHours();
    if (h < 10) {
      h = '0' + h;
    }
    result += h + ':';
    let m = d.getMinutes();
    if (m < 10) {
      m = '0' + m;
    }
    result += m;
    return result;
  }

  _valueHandler(e) {
    const cpath = `_${e.target.id}`;
    this[cpath] = e.detail.value;
  }
  /**
   * Fired when a cookie should be saved.
   *
   * The event does not bubble.
   *
   * @event save-cookie
   * @param {String} name
   * @param {String} value
   * @param {String} domain
   * @param {String} path
   * @param {Number} expires
   * @param {Boolean} hostOnly
   * @param {Boolean} httpOnly
   * @param {Boolean} secure
   * @param {Boolean} session
   */

  /**
   * Fired when edit was cancelled.
   *
   * @event cancel-cookie-edit
   */
}
window.customElements.define('cookie-editor', CookieEditor);
