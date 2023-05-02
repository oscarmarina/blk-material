import { LitElement, html } from 'lit';
import { tokens } from './styles/blk-button-tokens.js';
import { styles } from './styles/blk-button-styles.css.js';
import '../define/blk-ripple.js';

export class BlkButton extends LitElement {
  static is = 'blk-button';

  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static styles = [tokens, styles];

  static properties = {
    disabled: {
      type: Boolean,
      reflect: true,
    },
  };

  constructor() {
    super();
    this.disabled = false;
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.setAttribute('role', 'none');
  }

  render() {
    return html`
      <button ?disabled="${this.disabled}">
        <blk-ripple ?disabled="${this.disabled}" role="none"></blk-ripple>
        <slot></slot>
      </button>
    `;
  }
}
