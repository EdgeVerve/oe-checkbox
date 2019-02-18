/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */

/* beautify preserve:start */
import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";
/* beautify preserve:end */

import { OEFieldMixin } from "oe-mixins/oe-field-mixin.js";
import "oe-i18n-msg/oe-i18n-msg.js";
import "@polymer/paper-checkbox/paper-checkbox.js";

/**
 * # oe-checkbox
 * 
 * `<oe-checkbox>` is a control for boolean input based on Polymer's `paper-checkbox` control with following additional features.
 *
 * ## Features 
 *   1. Control level validations.
 *   2. Model-level/cross-field validations. When any UI control is placed on the form, the control needs to be 'aware' of 'which property' on the model it is bound to. This is required specially since, many times two or more controls take part in deciding the model validity. (cross-field-validations)
 *   3. Support internationalization of labels
 * 
 *     <oe-checkbox required field-id="accountName" label="Account Name"></oe-checkbox>
 * 
 * @customElement
 * @polymer
 * @appliesMixin OEFieldMixin
 * @demo demo/demo-oe-checkbox.html
 * 
 */
class OeCheckbox extends mixinBehaviors([], PolymerElement) {
  static get is() {
    return 'oe-checkbox';
  }

  static get template() {
    return html `
    <style>
      :host {
        padding-top: 30px;
      }

    </style>

    <paper-checkbox disabled=[[disabled]] checked={{value}}>
      <oe-i18n-msg msgid=[[label]]>[[label]]</oe-i18n-msg>
    </paper-checkbox>
    `;
  }

  static get properties() {
    return {
      /** the label */
      label: {
        type: String
      },

      /** Boolean value property bound to `checked` property of underlying `paper-checkbox` */
      value: {
        type: Boolean,
        notify: true
      },

      /** Boolean disabled property bound to `disabled` property of underlying `paper-checkbox` */
      disabled: {
        type: Boolean,
        notify: true
      }
    };
  }


  /**
   * Local validations to always set field validation as true.
   * @return {boolean} valid flag as true
   */
  _validate() {
    this.setValidity(true, undefined);
    return true;
  }
  /**
   * Connected Callback to initiate 'change' listener with validation function.
   * 
   */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('change', e => this.validate(e));
  }
}

window.customElements.define(OeCheckbox.is, OEFieldMixin(OeCheckbox));
