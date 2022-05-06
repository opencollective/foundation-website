const axios = require('axios');

const BASE_URL = 'https://opencollective.com';

module.exports = axios.create({
  baseURL: BASE_URL,
});
