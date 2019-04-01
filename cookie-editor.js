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
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {mixinBehaviors} from '../../@polymer/polymer/lib/legacy/class.js';
import {IronResizableBehavior} from '../../@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import '../../@polymer/polymer/lib/utils/render-status.js';
import '../../@polymer/paper-toggle-button/paper-toggle-button.js';
import '../../@polymer/paper-input/paper-input.js';
import '../../@polymer/paper-button/paper-button.js';
import '../../@polymer/iron-form/iron-form.js';
import '../../@polymer/paper-toggle-button/paper-toggle-button.js';
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
class CookieEditor extends
  mixinBehaviors([IronResizableBehavior], PolymerElement) {
  static get template() {
    return html`
    <style>
    :host {
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

    .actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 20px;
    }

    .actions paper-button {
      color: var(--primary-color);
      padding-left: 12px;
      padding-right: 12px;
    }

    .actions paper-button.action-button {
      background-color: var(--primary-color);
      color: var(--primary-action-color, #fff);
    }
    </style>
    <h2>Edit cookie</h2>
    <iron-form id="form" on-iron-form-presubmit="_formSubmit">
      <form method="post">
        <paper-input
          label="Cookie name (required)"
          id="cname"
          name="name"
          required=""
          auto-validate=""
          error-message="Name is required"></paper-input>
        <paper-input
          label="Value"
          name="value"
          id="cvalue"></paper-input>
        <paper-input
          label="Domain (required)"
          id="cdomain"
          required=""
          auto-validate=""
          error-message="Domain is required"
          name="domain"></paper-input>
        <paper-input
          label="Path (required)"
          id="cpath"
          name="path"
          required=""
          auto-validate=""
          error-message="Path is required"></paper-input>
        <paper-input
          id="cexpires"
          type="datetime-local"
          name="expires"
          label="Expires"
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" auto-validate=""></paper-input>
        <paper-toggle-button name="hostOnly" id="chostOnly">Host only</paper-toggle-button>
        <paper-toggle-button name="httpOnly" id="chttpOnly">HTTP only</paper-toggle-button>
        <paper-toggle-button name="secure" id="csecure">Secure</paper-toggle-button>
        <paper-toggle-button name="session" id="csession">Session</paper-toggle-button>
      </form>
    </iron-form>
    <div class="actions">
      <paper-button on-click="_cancel" data-action="cancel-action">cancel</paper-button>
      <paper-button on-click="_save" data-action="save-action" class="action-button">Save</paper-button>
    </div>
`;
  }

  static get properties() {
    return {
      /**
       * Currently existing cookie.
       * Values of this propertue will not going to be changed.
       * All new values are sent only in the `save-cookie` event
       */
      cookie: {
        type: Object,
        observer: '_cookieChanged'
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._ensureAttribute('tabindex', -1);
    this._ensureAttribute('role', 'dialog');
  }

  // Resets state of the UI controls
  _resetValues() {
    this.$.cname.value = '';
    this.$.cvalue.value = '';
    this.$.cdomain.value = '';
    this.$.cpath.value = '';
    this.$.cexpires.value = '';
    this.$.chostOnly.checked = false;
    this.$.chttpOnly.checked = false;
    this.$.csecure.checked = false;
    this.$.csession.checked = false;
  }
  /**
   * Updates state of the UI constrols depending on existing cookie value
   * @param {Object} value Cookie to render
   */
  _cookieChanged(value) {
    this._resetValues();
    if (!value) {
      return;
    }
    this.$.cname.value = value.name || '';
    this.$.cvalue.value = value.value || '';
    this.$.cdomain.value = value.domain || '';
    this.$.cpath.value = value.path || '';
    this.$.chostOnly.checked = value.hostOnly === true ? true : false;
    this.$.chttpOnly.checked = value.httpOnly === true ? true : false;
    this.$.csecure.checked = value.secure === true ? true : false;
    this.$.csession.checked = value.session === true ? true : false;
    const exp = this._convertTime(value.expires);
    this.$.cexpires.value = exp || '';
  }

  /**
   * Sends the `cancel-cookie-edit` custom event to cancel the edit.
   */
  _cancel() {
    this.dispatchEvent(new CustomEvent('cancel-cookie-edit', {
      composed: true
    }));
  }
  /**
   * Sets `override` to `false` and sends the form.
   */
  _save() {
    if (!this.$.form.validate()) {
      return;
    }
    this.$.form.submit();
  }

  /**
   * Sends the `save-request` custom event with computed detail object.
   *
   * @param {CustomEvent} e
   */
  _formSubmit(e) {
    e.preventDefault();
    const values = this.$.form.serializeForm();
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
    this.dispatchEvent(new CustomEvent('save-cookie', {
      composed: true,
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