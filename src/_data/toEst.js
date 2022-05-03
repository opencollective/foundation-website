const { utcToZonedTime } = require('date-fns-tz');

module.exports = () => {
  return (date) => {
    return utcToZonedTime(date, 'America/New_York');
  };
};
