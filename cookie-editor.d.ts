/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   cookie-editor.html
 */

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../polymer/types/lib/legacy/class.d.ts" />
/// <reference path="../polymer/types/lib/utils/render-status.d.ts" />
/// <reference path="../paper-toggle-button/paper-toggle-button.d.ts" />
/// <reference path="../iron-resizable-behavior/iron-resizable-behavior.d.ts" />
/// <reference path="../iron-flex-layout/iron-flex-layout.d.ts" />
/// <reference path="../paper-input/paper-input.d.ts" />
/// <reference path="../paper-button/paper-button.d.ts" />
/// <reference path="../iron-form/iron-form.d.ts" />

declare namespace UiElements {

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
   * `--cookie-editor` | Mixin applied to the element | `{}`
   * `--cookie-editor-actions` | Mixin applied to actions conatiner | `{}`
   * `--cookie-editor-action-buttons` | Mixin applied to action buttons | `{}`
   */
  class CookieEditor extends
    Polymer.IronResizableBehavior(
    Polymer.Element) {

    /**
     * Currently existing cookie.
     * Values of this propertue will not going to be changed.
     * All new values are sent only in the `save-cookie` event
     */
    cookie: object|null|undefined;
    connectedCallback(): void;

    /**
     * Resets state of the UI controls
     */
    _resetValues(): void;

    /**
     * Updates state of the UI constrols depending on existing cookie value
     *
     * @param value Cookie to render
     */
    _cookieChanged(value: object|null): void;

    /**
     * Sends the `cancel-cookie-edit` custom event to cancel the edit.
     */
    _cancel(): void;

    /**
     * Sets `override` to `false` and sends the form.
     */
    _save(): void;

    /**
     * Sends the `save-request` custom event with computed detail object.
     */
    _formSubmit(e: CustomEvent|null): void;

    /**
     * Converts the timestamp to a formatted date string accepted by the input
     * field.
     *
     * @param time Timestamp.
     * @returns Formatted date or undefined if `time` is not set or
     * invalid.
     */
    _convertTime(time: Number|null): String|null;
  }
}

interface HTMLElementTagNameMap {
  "cookie-editor": UiElements.CookieEditor;
}