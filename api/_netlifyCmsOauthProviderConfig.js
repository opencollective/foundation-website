require('dotenv').config();

const host =
  process.env.VERCEL_URL ||
  'foundation-website-git-new-opencollective.vercel.app';

const completeUrl = `https://${host}/api/complete`;

const config = {
  origin: host,
  completeUrl,
  oauthProvider: 'github',
  adminPanelUrl: '/admin',
  oauthScopes: 'repo user',
};

module.exports = config;
