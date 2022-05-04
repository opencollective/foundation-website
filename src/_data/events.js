const axios = require('axios');

module.exports = async () => {
  const { data } = await axios.get(
    'https://opencollective.com/foundation/events.json'
  );
  return data;
};
