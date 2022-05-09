const { createVercelBeginHandler } = require('netlify-cms-oauth-provider-node');
const config = require('./_netlifyCmsOauthProviderConfig');

console.log(config);

module.exports = createVercelBeginHandler(config, { useEnv: true });
