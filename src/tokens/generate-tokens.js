import { SYSTEM } from './blk-system.js';

export const SURFACE = 'surface-tone';

// const camelCase = str => str.replace(/[-_\s]+(\w)/g, (_, m) => m.toUpperCase());
const camelToDash = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Create a single CSS style rule.
 *
 * @param {string} selector
 * @param {Array<string>} values
 * @returns {string} cssText
 */
export function cssStyleRule(selector, values) {
  const cssText = `${selector} {
    ${values.join('')}
  }`;

  // eslint-disable-next-line no-console
  // console.log(cssText);
  return cssText;
}

/**
 * Create custom CSS properties for a given data.
 *
 * @param {Object} options
 * @param {Object} options.data
 * @param {string} options.system
 * @param {string} options.prefix
 * @param {string} options.type
 * @param {string} options.tone
 * @returns {string} Custom CSS properties
 */

const createCssCustomProperties = ({
  data,
  system = '',
  prefix = '',
  type = 'default',
  tone = '',
}) => {
  const { namespace, scheme = {}, refToken = {} } = SYSTEM[system] || {};
  const hasPrefix = prefix ? `${prefix}-` : '';
  return Object.entries(data)
    .map(([itemName, itemValue]) => {
      const varMap = {
        default: () => {
          const isHardcoded = system === 'hardcoded';
          return {
            varName: `--_${itemName}`,
            varValue: isHardcoded
              ? `var(--${hasPrefix}${itemName}, var(--${hasPrefix}${SURFACE}-${itemName}, var(--${hasPrefix}initial-${itemName}, ${itemValue})));`
              : `var(--${hasPrefix}${itemName}, var(--${hasPrefix}${SURFACE}-${itemName}, var(--${hasPrefix}initial-${itemName}, var(--${namespace}-${itemValue}, ${
                  refToken[scheme[itemValue]]
                }))));`,
          };
        },
        tone: () => ({
          varName: `--${hasPrefix}${SURFACE}-${itemName}`,
          varValue: `var(--${hasPrefix}${SURFACE}-${tone}-${itemName}, var(--${namespace}-${itemValue}, ${
            refToken[scheme[itemValue]]
          }));`,
        }),
        componentVar: () => ({
          varName: `--${hasPrefix}${itemName}`,
          varValue: `var(--_${itemValue});`,
        }),
      };
      const { varName, varValue } = varMap[type]();
      return `${varName}: ${varValue}`;
    })
    .join('');
};

/**
 * Create custom CSS properties for a component.
 *
 * @param {Object} data
 * @param {string} prefix
 * @returns {string} Custom CSS properties
 */
export const setVariables = (data, prefix) =>
  createCssCustomProperties({ data, prefix, type: 'componentVar' });

/**
 * Create custom CSS properties for all tokens in a data.
 *
 * @param {Object} data
 * @param {string} prefix
 * @returns {string} Custom CSS properties
 */
export const setTokens = (data, prefix) =>
  Object.keys(data).reduce(
    (acc, key) => `${acc}${createCssCustomProperties({ data: data[key], system: key, prefix })}`,
    '',
  );

/**
 * Create custom CSS properties for all tone colors.
 *
 * @param {Object} data
 * @param {string} prefix
 * @returns {Object} Custom CSS properties
 */
export const setTones = (data, prefix) =>
  Object.entries(data).reduce((acc, [key, value]) => {
    acc[key] = createCssCustomProperties({
      data: value,
      prefix,
      type: 'tone',
      tone: camelToDash(key),
      system: 'sysColor',
    });
    return acc;
  }, {});
