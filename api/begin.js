const { createVercelBeginHandler } = require('netlify-cms-oauth-provider-node');
const config = require('./_netlifyCmsOauthProviderConfig');

module.exports = createVercelBeginHandler(config, { useEnv: true });
