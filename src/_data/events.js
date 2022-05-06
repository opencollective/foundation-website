const apiV1 = require('../shared/OpenCollectiveApiV1');

const COLLECTIVE_SLUG = 'foundation';

module.exports = async () => {
  const { data } = await apiV1.get(`/${COLLECTIVE_SLUG}/events.json`);
  return data;
};
