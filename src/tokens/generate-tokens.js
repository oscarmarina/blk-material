import {SYSTEM} from './blk-system.js';

export const ROLES = 'roles';

/**
 * Returns an object with concatenated strings by key.
 *
 * @param {Array<Object>} arr - The array of objects to process.
 * @returns {Object} An object with concatenated string values.
 */
export const concatenateStringsByKey = (arr) => {
  /**
   * A map to store the concatenated strings.
   *
   * @type {Map<string, string>}
   */
  const stringsMap = new Map();

  for (const obj of arr) {
    if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object') {
      for (const key of Object.keys(obj)) {
        if (typeof obj[key] === 'string') {
          const concatenatedString = (stringsMap.get(key) || '') + obj[key];
          stringsMap.set(key, concatenatedString);
        }
      }
    }
  }

  return Object.fromEntries(stringsMap);
};

/**
 * Converts camelCase to kebab-case.
 *
 * @param {string} str - The input string in camelCase.
 * @returns {string} The string in kebab-case.
 */
const camelToDash = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Create a single CSS style rule.
 *
 * @param {string} selector - The CSS selector.
 * @param {Array<string>} values - An array of CSS property-value pairs.
 * @returns {string} The CSS rule as a string.
 */
export function cssStyleRule(selector, values) {
  const cssText = `${selector} {
    ${values.join('')}
  }`;
  return cssText;
}

/**
 * Create custom CSS properties for a given data.
 *
 * @param {Object} options - Options object.
 * @param {Object} options.data - Data object containing CSS properties.
 * @param {string} [options.system=''] - System name.
 * @param {string} [options.prefix=''] - Prefix for custom properties.
 * @param {string} [options.type='default'] - Type of custom properties.
 * @param {string} [options.roles=''] - Roles for custom properties.
 * @returns {string} Custom CSS properties.
 */
const createCssCustomProperties = ({
  data,
  system = '',
  prefix = '',
  type = 'default',
  roles = '',
}) => {
  // Get the namespace, scheme, and refToken from the SYSTEM configuration.
  const {namespace, scheme = {}, refToken = {}} = SYSTEM[system] || {};
  // Add a prefix to the CSS variable name if it exists.
  const hasPrefix = prefix ? `${prefix}-` : '';

  const generateVarMap = (itemName, itemValue) => ({
    default: () => {
      const isHardcoded = system === 'sysHardcoded';
      return {
        varName: `--_${itemName}`,
        varValue: isHardcoded
          ? `var(--${hasPrefix}${itemName}, var(--${hasPrefix}${ROLES}-${itemName}, var(--${hasPrefix}initial-${itemName}, ${itemValue})));`
          : `var(--${hasPrefix}${itemName}, var(--${hasPrefix}${ROLES}-${itemName}, var(--${hasPrefix}initial-${itemName}, var(--${namespace}-${itemValue}, ${
              refToken[scheme[itemValue]]
            }))));`,
      };
    },
    roles: () => ({
      varName: `--${hasPrefix}${ROLES}-${itemName}`,
      varValue: `var(--${hasPrefix}${ROLES}-${roles}-${itemName}, var(--${namespace}-${itemValue}, ${
        refToken[scheme[itemValue]]
      }));`,
    }),
    componentVar: () => ({
      varName: `--${hasPrefix}${itemName}`,
      varValue: `var(--_${itemValue});`,
    }),
  });

  return Object.entries(data)
    .map(([itemName, itemValue]) => {
      const {varName, varValue} = generateVarMap(itemName, itemValue)[type]();
      return `${varName}: ${varValue}`;
    })
    .join('');
};

/**
 * Create custom CSS properties for a component.
 *
 * @param {Object} data - Data object.
 * @param {string} prefix - Prefix for custom properties.
 * @returns {string} Custom CSS properties.
 */
export const setVariables = (data, prefix) =>
  createCssCustomProperties({data, prefix, type: 'componentVar'});

/**
 * Create custom CSS properties for all tokens in a data.
 *
 * @param {Object} data - Data object.
 * @param {string} prefix - Prefix for custom properties.
 * @returns {string} Custom CSS properties.
 */
export const setTokens = (data, prefix) =>
  Object.keys(data).reduce(
    (acc, key) => `${acc}${createCssCustomProperties({data: data[key], system: key, prefix})}`,
    ''
  );

/**
 * Create custom CSS properties for all roles.
 *
 * @param {Object} data - Data object.
 * @param {string} prefix - Prefix for custom properties.
 * @returns {Object} Custom CSS properties.
 */
export const setRoles = (data, prefix) =>
  Object.entries(data).reduce((acc, [key, value]) => {
    acc[key] = createCssCustomProperties({
      data: value,
      prefix,
      type: 'roles',
      roles: camelToDash(key),
      system: 'sysColor',
    });
    return acc;
  }, {});
