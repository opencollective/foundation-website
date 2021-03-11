const lodash = require('lodash');

/**
 * Makes lodash available in ejs as _
 */

module.exports = () => {
  return lodash;
};
