const apiV1 = require('../shared/OpenCollectiveApiV1');

module.exports = async () => {
  const { data } = await apiV1.get('/foundation/events.json');
  return data;
};
