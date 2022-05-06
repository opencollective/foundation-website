const { GraphQLClient } = require('graphql-request');

const ENDPOINT = 'https://api.opencollective.com/graphql/v2/';
const API_KEY = process.env.OPEN_COLLECTIVE_API_KEY;

if (!API_KEY) {
  console.error('Missing OC API V2 key');
}

module.exports = new GraphQLClient(ENDPOINT, {
  headers: {
    'Api-Key': API_KEY,
  },
});
