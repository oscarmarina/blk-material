import {html, LitElement, unsafeCSS} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {BlockquoteControllerContextMeta} from '@blockquote-web-components/blockquote-controller-context-meta';
import {webLightTheme} from '@fluentui/tokens';
import {setTheme /* , ButtonDefinition, FluentDesignSystem */} from '@fluentui/web-components';
import {styleTokens} from './styles/blk-material-tokens.js';
import {styles} from './styles/blk-material-styles.css.js';
import '@fluentui/web-components/button.js';
import '../src/define/blk-button.js';

// console.log(webLightTheme);

setTheme(webLightTheme);
//ButtonDefinition.define(FluentDesignSystem.registry);

const SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 180 180"><path fill="#F1F3F4" d="M0 20C0 8.954 8.954 0 20 0h140c11.046 0 20 8.954 20 20v140c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20Z"/><g clip-path="url(#a)"><circle cx="90" cy="90" r="45" fill="#757575"/><path fill="#BDBDBD" d="M58.848 58.846h62.308v61.615H58.848z"/><path fill="#fff" d="M89.999 120.462 58.845 58.846h62.307l-31.153 61.616Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M45 45h90v90H45z"/></clipPath></defs></svg>';

/**
 * This converter ensures that when the attribute is set to 'false' declaratively,
 * the corresponding property is also set to `false`.
 * https://github.com/lit/lit/issues/4643#issuecomment-2104844952
 * https://github.com/microsoft/fast/blob/master/packages/web-components/fast-element/src/components/attributes.ts#L77
 *
 * @param {string | null} value - The attr value to convert.
 * @returns {boolean} - Returns `true` if the value is not 'false' and not null, otherwise `false`.
 */
// const booleanConverter = value => value !== 'false' && value != null;

/**
 * https://lit.dev/playground/#gist=9e14cacce1ef311168380e5b75fc2613
 */
// const fmt = (value) => typeof value === 'boolean' ? '' : value;
//  static shadowRootOptions = {...LitElement.shadowRootOptions, delegatesFocus: true};
//  this.renderOptions= {...this.renderOptions, host: this};
/**
 * ![Lit](https://img.shields.io/badge/lit-3.0.0-blue.svg)
 *
 * ## `<blk-material>`
 * > Exercise to understand the use of tokens by Google web material.
 * > Read [NOTES.md](./NOTES.md) to understand the proof of concept;
 *
 * [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/oscarmarina/blk-material)
 *
 * - https://material.io/blog/tone-based-surface-color-m3
 * - https://m3.material.io/styles/color/the-color-system/tokens
 * - https://m3.material.io/theme-builder#/dynamic
 *
 * ## Installation
 *
 * ```bash
 * npm i blk-material
 * ```
 *
 * ## Usage
 *
 * ```html
 * <script type="module">
 *   import 'blk-material/blk-material.js';
 * </script>
 *
 * <blk-material></blk-material>
 * ```
 *
 * ## Local Demo with `vite`
 *
 * ```bash
 * npm start
 * ```
 *
 * To run a local development server that serves the basic demo located in demo/index.html
 *
 *
 * @attribute heading
 * @attribute counter
 * @fires counterchange - Indicates when the count changes
 * @slot - This element has a slot
 */
export class BlkMaterial extends LitElement {
  static styles = [unsafeCSS(styleTokens), styles];

  static properties = {
    /**
     * The heading to say "Hello" to.
     */
    heading: {type: String},

    /**
     * The number of times the button has been clicked.
     */
    counter: {
      type: Number,
    },

    /**
     * This property defines the type of surface.
     */
    roles: {
      type: String,
      reflect: true,
    },
  };

  constructor() {
    super();
    this.roles = '';
    this.heading = 'Hey there';
    this.counter = 5;
    this.force = true;

    this.propertyContext = new BlockquoteControllerContextMeta(this, {
      context: 'symbol-roles',
    });
  }

  willUpdate(props) {
    super.willUpdate?.(props);
    if (props.has('roles')) {
      this.propertyContext.setValue(this.roles);
    }
  }

  get _svgTag() {
    return unsafeHTML(SVG);
  }

  get _isNested() {
    const thisTagName = this.tagName.toLowerCase();
    // return [...this.children].some(child => child.tagName.toLowerCase() === thisTagName);
    return this.matches(`:has(> ${thisTagName})`); // firefox does not support :has() selector
  }

  render() {
    return html`
      <span role="heading" aria-level="1">${this._sayHello(this.heading)}</span>
      <div>
        <figure aria-hidden="true">${this._svgTag}</figure>
        <div>
          <div class="supporting-text">Building on top of the Web Components standards</div>
          <div><slot></slot></div>
          <blk-button @click=${this.#onClick}>Counter: ${this.counter}</blk-button>
          <fluent-button>fluent</fluent-button>
        </div>
      </div>
    `;
  }

  #onClick() {
    this.counter += 1;
    this.dispatchEvent(new CustomEvent('counterchange', {detail: this.counter}));
  }

  /**
   * Formats a greeting
   * @param heading {string} The heading to say "Hello" to
   * @returns {string} A greeting directed at `heading`
   */
  _sayHello(heading) {
    return `Hello, ${heading}`;
  }
}
