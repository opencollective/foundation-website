const apiV2 = require('../shared/OpenCollectiveApiV2');
const { gql } = require('graphql-request');

const COLLECTIVE_SLUG = 'foundation';

const query = gql`
  query getCollectivesAndFundsCount($slug: String!) {
    accounts(type: [COLLECTIVE, FUND], host: [{ slug: $slug }]) {
      totalCount
    }
  }
`;

module.exports = async () => {
  const data = await apiV2.request(query, {
    slug: COLLECTIVE_SLUG,
  });

  // unwrap data
  return data.accounts.totalCount;
};
