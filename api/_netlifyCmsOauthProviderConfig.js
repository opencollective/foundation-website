require('dotenv').config();

const host = process.env.VERCEL_URL || 'localhost:3000';

const completeUrl = `https://${host}/api/complete`;

const config = {
  origin: host,
  completeUrl,
  oauthProvider: 'github',
  adminPanelUrl: '/admin',
};

module.exports = config;
