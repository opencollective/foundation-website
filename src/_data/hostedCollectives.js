const apiV2 = require('../shared/OpenCollectiveApiV2');
const { gql } = require('graphql-request');

const COLLECTIVE_SLUG = 'foundation';

const query = gql`
  query getHostedCollectives($slug: String!) {
    account(slug: $slug) {
      memberOf(
        accountType: COLLECTIVE
        orderBy: { field: MEMBER_COUNT, direction: DESC }
        role: HOST
      ) {
        nodes {
          since
          account {
            id
            name
            slug
            description
            imageUrl
          }
        }
      }
    }
  }
`;

module.exports = async () => {
  const data = await apiV2.request(query, {
    slug: COLLECTIVE_SLUG,
  });

  // unwrap data
  return data.account.memberOf.nodes;
};
