const { createVercelBeginHandler } = require('netlify-cms-oauth-provider-node');
const config = require('./netlifyCmsOauthProviderConfig');

module.exports = createVercelBeginHandler({}, config);
