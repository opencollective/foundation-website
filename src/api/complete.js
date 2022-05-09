const config = require('./netlifyCmsOauthProviderConfig');
const {
  createVercelCompleteHandler,
} = require('netlify-cms-oauth-provider-node');

module.exports = createVercelCompleteHandler({}, config);
