import { css, unsafeCSS } from 'lit';
import {
  cssStyleRule,
  setTokens /* , setTones, setVariables */,
} from '../tokens/generate-tokens.js';

export const PREFIX = 'blk-ripple';

const sysColor = {
  'hover-color': 'on-surface',
  'focus-color': 'on-surface',
  'pressed-color': 'on-surface',
};
const sysAlpha = {
  'hover-opacity': 'hover-state-layer-opacity',
  'focus-opacity': 'focus-state-layer-opacity',
  'pressed-opacity': 'pressed-state-layer-opacity',
};

const host = { sysColor, sysAlpha };
const hostTokens = setTokens(host, PREFIX);

export const tokens = css`
  ${unsafeCSS(cssStyleRule(`:host`, [hostTokens]))}
`;
