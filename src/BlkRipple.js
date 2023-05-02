import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { tokens } from './styles/blk-ripple-tokens.js';
import { styles } from './styles/blk-ripple-styles.css.js';

const TOUCH_DELAY_MS = 150;

export class BlkRipple extends LitElement {
  static is = 'blk-ripple';

  static styles = [tokens, styles];

  static properties = {
    disabled: {
      type: Boolean,
    },
    hovered: {
      type: Boolean,
    },
    focused: {
      type: Boolean,
    },
    pressed: {
      type: Boolean,
    },
  };

  constructor() {
    super();
    this.element = this.parentElement;

    this.element.addEventListener('click', this);
    // this.element.addEventListener('contextmenu', this);
    this.element.addEventListener('pointercancel', this);
    this.element.addEventListener('pointerdown', this);
    this.element.addEventListener('pointerenter', this);
    this.element.addEventListener('pointerleave', this);
    this.element.addEventListener('pointerup', this);
    this.element.addEventListener('focus', this);
    this.element.addEventListener('blur', this);
  }

  async handleEvent(ev) {
    if (this.disabled) {
      return;
    }
    switch (ev.type) {
      case 'click':
        this.handleClick(ev);
        break;
      case 'contextmenu':
        // this.handleContextmenu();
        break;
      case 'pointercancel':
        this.handlePointercancel(ev);
        break;
      case 'pointerdown':
        this.handlePointerdown(ev);
        break;
      case 'pointerenter':
        this.handlePointerenter(ev);
        break;
      case 'pointerleave':
        this.handlePointerleave(ev);
        break;
      case 'pointerup':
        this.handlePointerup(ev);
        break;
      case 'focus':
        this.handleFocus(ev);
        break;
      case 'blur':
        this.handleBlur(ev);
        break;
      default:
        break;
    }
  }

  handlePointerenter() {
    this.hovered = true;
  }

  handlePointerleave() {
    this.hovered = false;
  }

  handleFocus(ev) {
    this.focused = ev.target?.matches(':focus-visible');
  }

  handleBlur() {
    this.focused = false;
  }

  handlePointerdown() {
    this.pressed = true;
  }

  handlePointerup() {
    this.pressed = false;
  }

  async handleClick() {
    this.pressed = true;
    await new Promise(resolve => {
      setTimeout(resolve, TOUCH_DELAY_MS);
    });
    this.pressed = false;
  }

  render() {
    const classes = {
      hovered: this.hovered,
      focused: this.focused,
      pressed: this.pressed,
    };
    return html` <div class="surface ${classMap(classes)}"></div>
      <span class="focus-ring"></span>`;
  }
}
