const { utcToZonedTime } = require('date-fns-tz');

/**
 * Makes lodash available in ejs as _
 */

module.exports = () => {
  return (date) => {
    return utcToZonedTime(date, 'America/New_York');
  };
};
