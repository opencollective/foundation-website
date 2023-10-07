const apiV2 = require('../shared/OpenCollectiveApiV2');
const { gql } = require('graphql-request');

const COLLECTIVE_SLUG = 'foundation';

const query = gql`
  query fetchEvents($slug: String!, $limit: Int) {
    account(slug: $slug) {
      id
      childrenAccounts(limit: $limit, accountType: EVENT) {
        nodes {
          id
          name
          description
          slug
          image: imageUrl
          ... on Event {
            startsAt
            endsAt
            timezone
          }
          location {
            name
            address
            lat
            long
          }
        }
      }
    }
  }
`;

module.exports = async () => {
  const data = await apiV2.request(query, {
    slug: COLLECTIVE_SLUG,
    limit: 10,
  });

  return data.account.childrenAccounts.nodes;
};
