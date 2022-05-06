const { GraphQLClient } = require('graphql-request');

const ENDPOINT = 'https://api.opencollective.com/graphql/v2/';
const API_KEY = process.env.OPEN_COLLECTIVE_API_KEY;

module.exports = new GraphQLClient(ENDPOINT, {
  headers: API_KEY
    ? {
        'Api-Key': API_KEY,
      }
    : {},
});
