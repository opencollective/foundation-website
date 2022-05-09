const config = require('./_netlifyCmsOauthProviderConfig');
const {
  createVercelCompleteHandler,
} = require('netlify-cms-oauth-provider-node');

module.exports = createVercelCompleteHandler(config, { useEnv: true });
