require('dotenv').config();

const host = 'opencollective.foundation';

const completeUrl = `https://${host}/api/complete`;

const config = {
  origin: host,
  completeUrl,
  oauthProvider: 'github',
  adminPanelUrl: '/admin',
  oauthScopes: 'repo user',
};

module.exports = config;
