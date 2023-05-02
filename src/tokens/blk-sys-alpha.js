import refAlpha from './blk-ref-alpha.js';

const reference = refAlpha;
const namespace = 'sys-state';

const light = {
  'very-clear': 'alpha100', // 0.08
  'semi-clear': 'alpha200', // 0.12
  'semi-solid': 'alpha300', // 0.16
  'very-solid': 'alpha400', // 0.38
  'dragged-state-layer-opacity': 'alpha300', // 0.16
  'focus-state-layer-opacity': 'alpha200', // 0.12
  'hover-state-layer-opacity': 'alpha100', // 0.08
  'pressed-state-layer-opacity': 'alpha200', // 0.12
};

const sysAlpha = {
  refToken: reference,
  namespace,
  scheme: light,
};

export default sysAlpha;
