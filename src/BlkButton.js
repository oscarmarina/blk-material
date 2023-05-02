import {LitElement, html, unsafeCSS} from 'lit';
import {BlockquoteControllerContextMeta} from '@blockquote-web-components/blockquote-controller-context-meta';
import {styleTokens} from './styles/blk-button-tokens.js';
import {styles} from './styles/blk-button-styles.css.js';
import '../src/define/blk-ripple.js';

export class BlkButton extends LitElement {
  /**
   * @internal
   */
  static shadowRootOptions = {...LitElement.shadowRootOptions, delegatesFocus: true};

  static styles = [unsafeCSS(styleTokens), styles];

  static properties = {
    roles: {
      type: String,
      reflect: true,
    },

    disabled: {
      type: Boolean,
      reflect: true,
    },
  };

  constructor() {
    super();
    this.disabled = false;

    this.propertyContext = new BlockquoteControllerContextMeta(this, {
      context: 'symbol-roles',
      callback: (v) => {
        this.roles = v;
      },
    });
  }

  connectedCallback() {
    super.connectedCallback?.();
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
