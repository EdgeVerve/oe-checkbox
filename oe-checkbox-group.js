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
import "@polymer/iron-selector/iron-selector.js";
import "@polymer/paper-input/paper-input-container.js";
import "@polymer/iron-selector/iron-selector.js";
/**
 * # oe-checkbox-group
 * `oe-checkbox-group` is a wrapper over `iron-selector` and `paper-checkbox` that auto-generates the underlying `paper-checkboxes` based on provided `listdata`.
 * 
 * @customElement
 * @polymer
 * @appliesMixin OEFieldMixin
 * @demo demo/demo-oe-checkbox-group.html
 */
class OeCheckboxGroup extends mixinBehaviors([], PolymerElement) {
  static get is() {
    return 'oe-checkbox-group';
  }

  static get template() {
    return html `
    <style>
       :host {
        display: block;
        --paper-radio-group-item-padding: 2px;
        --paper-input-container-underline: {
          display: none;
        };

        --paper-input-container-underline-focus: {
          display: none;
        };

        --paper-input-container-underline-disabled: {
          display: none;
        };
      }
      paper-radio-button {
        padding-right: 12px;
      }
      span.required {
        color: var(--paper-input-container-invalid-color, var(--google-red-500));
        @apply --oe-required-mixin;
      }
    </style>

    <paper-input-container always-float-label>
      <label slot="label" hidden$="[[!label]]">
        <oe-i18n-msg msgid=[[label]]>[[label]]</oe-i18n-msg>
        <template is="dom-if" if={{required}}><span class="required"> *</span></template>
      </label>

      <iron-selector slot="input" class="paper-input-input" id="ironSelector" selected-attribute="checked" disabled=[[disabled]] multi selected-values="{{value}}"
        attr-for-selected="x">
        <template is="dom-repeat" items={{listdata}}>
          <paper-checkbox x="[[_getValue(item)]]" disabled=[[disabled]]>
            <oe-i18n-msg msgid=[[_getDisplay(item)]]>[[_getDisplay(item)]]</oe-i18n-msg>
          </paper-checkbox>
        </template>
      </iron-selector>
      <oe-input-error slot="add-on" invalid={{invalid}} error-message={{errorMessage}}></oe-input-error>
    </paper-input-container>
    `;
  }

  static get properties() {
    return {
      /**
       * label for control
       */
      label: {
        type: String
      },
      /**
       * value, this control is bound to.
       */
      value: {
        type: Array,
        value: function() {
          return [];
        },
        notify: true
      },

      /**
       * listdata to display as Checkbox.
       * * When specified as array of premitives (string/number), leave displayproperty and valueproperty as undefined.
       * * When specified as array of Objects/{d:...,v:...}, specify displayproperty to control which property is displayed
       *    as label on the choices. When  valueproperty is not defined, enire member object is set as `value`, otherwise
       *    specified property reflects into `value`.
       */
      listdata: {
        type: Array,
        notify: true
      },

      /**
       * When `listdata` is specified as array of Objects/{d:...,v:...}, displayproperty controls which property
       * is displayed as label on the choices.
       */
      displayproperty: {
        type: String
      },

      /**
       * When `listdata` is specified as array of Objects/{d:...,v:...}
       * * If valueproperty is not defined, entire member object is set as `value`,
       * * otherwise specified `valueproperty` reflects into `value`.
       */
      valueproperty: {
        type: String
      },

      /**
       * Disabled
       */
      disabled: {
        type: Boolean
      },

      /**
       * Required
       */
      required: {
        type: Boolean
      }

    };
  }

  static get observers() {
    return [
      '_valueChanged(value.*)'
    ];
  }

  _validate() {
    if (this.required && (this.value === undefined || this.value.length === 0)) {
      this.setValidity(false, 'valueMissing');
    } else {
      this.setValidity(true, undefined);
    }
    return true;
  }
  _valueChanged(val) {
    if (val.path === 'value.length') {
      this.validate();
    }
  }
  _getValue(choice) {
    var ret = choice;
    if (choice && this.valueproperty) {
      ret = choice[this.valueproperty];
    }
    return ret;
  }
  _getDisplay(choice) {
    var ret = choice;
    if (choice && this.displayproperty) {
      ret = choice[this.displayproperty];
    }
    return ret;
  }


}

window.customElements.define(OeCheckboxGroup.is, OEFieldMixin(OeCheckboxGroup));
