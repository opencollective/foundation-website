const { format } = require('date-fns-tz');

/**
 * Makes lodash available in ejs as _
 */

module.exports = () => {
  return (date, pattern, options = {}) => {
    return format(date, pattern, { timeZone: 'America/New_York', ...options });
  };
};
