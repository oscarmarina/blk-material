import units from './blk-ref-spacing.js';

const reference = units;
const namespace = 'sys-spacing';

const light = {
  'spacing-base-unit': 'unit',
  'spacing-unit': 'design-unit',
};

const sysSpacing = {
  refToken: reference,
  namespace,
  scheme: light,
};

export default sysSpacing;
