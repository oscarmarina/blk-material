import { css, unsafeCSS } from 'lit';
import { cssStyleRule, setTokens, setTones, setVariables } from '../tokens/generate-tokens.js';

export const PREFIX = 'blk-button';

const sysColor = {
  'container-color': 'primary',
  'label-text-color': 'on-primary',
  'focus-label-text-color': 'on-primary',
  'hover-label-text-color': 'on-primary',
  'pressed-label-text-color': 'on-primary',
  'disabled-container-color': 'on-surface',
  'disabled-label-text-color': 'on-surface',
  /* blkRipple */
  'hover-layer-color': 'primary',
  'pressed-layer-color': 'primary',
};

const sysAlpha = {
  'disabled-container-opacity': 'semi-clear',
  'disabled-label-text-opacity': 'very-solid',
  /* blkRipple */
  'hover-layer-opacity': 'hover-state-layer-opacity',
  'pressed-layer-opacity': 'pressed-state-layer-opacity',
};

const sysTypescale = {
  'label-text-type': 'label-large',
  'label-text-weight': 'label-large-weight',
  'label-text-line-height': 'label-large-line-height',
  'label-text-size': 'label-large-size',
  'label-text-font': 'label-large-font',
  'label-text-tracking': 'label-large-tracking',
};

const sysSpacing = {
  'block-spacing': 'spacing-unit',
  'inline-spacing': 'spacing-unit',
};
const hardcoded = {
  'container-shape': '2px',
};

const host = { sysColor, sysTypescale, sysAlpha, sysSpacing, hardcoded };

const dim = {
  'container-color': 'secondary',
  'label-text-color': 'on-secondary',
};

const surface = {
  'container-color': 'primary',
  'label-text-color': 'on-primary',
};

const bright = {
  'container-color': 'tertiary',
  'label-text-color': 'on-tertiary',
};

const blkRipple = {
  'initial-hover-color': 'hover-layer-color',
  'initial-hover-opacity': 'hover-layer-opacity',
  'initial-pressed-color': 'pressed-layer-color',
  'initial-pressed-opacity': 'pressed-layer-opacity',
};

const hostTokens = setTokens(host, PREFIX);
const blkRippleVars = setVariables(blkRipple, 'blk-ripple');
const tones = setTones({ dim, surface, bright }, PREFIX);

export const tokens = css`
  ${unsafeCSS(cssStyleRule(`:host`, [hostTokens, blkRippleVars]))}
  ${unsafeCSS(cssStyleRule(`:host([surface-tone="dim"])`, [tones.dim]))}
  ${unsafeCSS(cssStyleRule(`:host([surface-tone="surface"])`, [tones.surface]))}
  ${unsafeCSS(cssStyleRule(`:host([surface-tone="bright"])`, [tones.bright]))}
`;

// tones
export const blkButtonSurfacesBase = tones;
export const blkButtonSurfaces = {
  dim: css`
    ${unsafeCSS(
      cssStyleRule(`[data-surface-tone="dim"], :host([surface-tone="dim"])`, [tones.dim]),
    )}
  `,

  surface: css`
    ${unsafeCSS(
      cssStyleRule(`[data-surface-tone="surface"], :host([surface-tone="surface"])`, [
        tones.surface,
      ]),
    )}
  `,
  bright: css`
    ${unsafeCSS(
      cssStyleRule(`[data-surface-tone="bright"], :host([surface-tone="bright"])`, [tones.bright]),
    )}
  `,
};
