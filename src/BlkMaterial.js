import { html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { tokens } from './styles/blk-material-tokens.js';
import { styles } from './styles/blk-material-styles.css.js';
import { blkButtonSurfaces } from './styles/blk-button-tokens.js';
import '../define/blk-button.js';

const SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 180 180"><path fill="#F1F3F4" d="M0 20C0 8.954 8.954 0 20 0h140c11.046 0 20 8.954 20 20v140c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20Z"/><g clip-path="url(#a)"><circle cx="90" cy="90" r="45" fill="#757575"/><path fill="#BDBDBD" d="M58.848 58.846h62.308v61.615H58.848z"/><path fill="#fff" d="M89.999 120.462 58.845 58.846h62.307l-31.153 61.616Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M45 45h90v90H45z"/></clipPath></defs></svg>';

export class BlkMaterial extends LitElement {
  static is = 'blk-material';

  static styles = [tokens, styles, Object.values(blkButtonSurfaces)];

  static properties = {
    /**
     * The heading to say "Hello" to.
     * @type {string}
     */
    heading: { type: String },

    /**
     * The number of times the button has been clicked.
     * @type {number}
     */
    counter: { type: Number },
  };

  constructor() {
    super();
    this.heading = 'Hey there';
    this.counter = 5;
  }

  get _svgTag() {
    return unsafeHTML(SVG);
  }

  render() {
    return html`
      <span role="heading" aria-level="1">${this._sayHello(this.heading)}</span>
      <div>
        <figure>${this._svgTag}</figure>
        <div>
          <div class="supporting-text">Building on top of the Web Components standards</div>
          <div><slot></slot></div>
          <blk-button @click=${this.#onClick}>Counter: ${this.counter}</blk-button>
        </div>
      </div>
    `;
  }

  #onClick() {
    this.counter += 1;
    this.dispatchEvent(new CustomEvent('counterchange', { detail: this.counter }));
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
