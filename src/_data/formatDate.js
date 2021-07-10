const { format } = require('date-fns-tz');

/**
 * date formatting function bound to EST
 */

module.exports = () => {
  return (date, pattern, options = {}) => {
    return format(date, pattern, { timeZone: 'America/New_York', ...options });
  };
};
