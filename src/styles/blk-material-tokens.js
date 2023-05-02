import { css, unsafeCSS } from 'lit';
import { cssStyleRule, setTokens, setTones /* setVariables */ } from '../tokens/generate-tokens.js';
import { blkButtonSurfaces } from './blk-button-tokens.js';

export const PREFIX = 'blk-material';

const sysColor = {
  'container-color': 'surface-container',
  'label-text-color': 'on-surface',
};

const sysTypescale = {
  'body-text-type': 'label-large',
  'body-text-weight': 'label-large-weight',
  'body-text-line-height': 'label-large-line-height',
  'body-text-size': 'label-large-size',
  'body-text-font': 'label-large-font',
  'body-text-tracking': 'label-large-tracking',

  'header-supporting-text-type': 'body-large',
  'header-supporting-text-weight': 'body-large-weight',
  'header-supporting-text-line-height': 'body-large-line-height',
  'header-supporting-text-size': 'body-large-size',
  'header-supporting-text-font': 'body-large-font',
  'header-supporting-text-tracking': 'body-large-tracking',

  'header-headline-type': 'title-large',
  'header-headline-weight': 'title-large-weight',
  'header-headline-line-height': 'title-large-line-height',
  'header-headline-size': 'title-large-size',
  'header-headline-base-size': 'title-large-base-size',
  'header-headline-font': 'title-large-font',
  'header-headline-tracking': 'title-large-tracking',
};

const sysAlpha = {};

const sysSpacing = {
  'spacing-base-unit': 'spacing-base-unit',
  'block-spacing': 'spacing-unit',
  'inline-spacing': 'spacing-unit',
};

const hardcoded = {
  'container-shape': '2px',
};

const host = { sysColor, sysTypescale, sysAlpha, sysSpacing, hardcoded };

const dim = {
  'container-color': 'surface-container-low',
  'label-text-color': 'on-surface-variant',
};

const surface = {
  'container-color': 'surface-container',
  'label-text-color': 'on-surface',
};

const bright = {
  'container-color': 'surface-container-high',
  'label-text-color': 'on-surface-variant',
};

const hostTokens = setTokens(host, PREFIX);
const tones = setTones({ dim, surface, bright }, PREFIX);

export const tokens = css`
  ${unsafeCSS(cssStyleRule(`:host`, [hostTokens]))}
  ${unsafeCSS(cssStyleRule(`:host([surface-tone="dim"])`, [tones.dim]))}
  ${unsafeCSS(cssStyleRule(`:host([surface-tone="surface"])`, [tones.surface]))}
  ${unsafeCSS(cssStyleRule(`:host([surface-tone="bright"])`, [tones.bright]))}
`;

// surfaces
export const blkMaterialSurfacesBase = tones;
export const blkMaterialSurfaces = {
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
    ${blkButtonSurfaces.surface}
  `,

  bright: css`
    ${unsafeCSS(
      cssStyleRule(`[data-surface-tone="bright"], :host([surface-tone="bright"])`, [tones.bright]),
    )}
    ${blkButtonSurfaces.bright}
  `,
};
