require('dotenv').config();

const { VERCEL_URL } = process.env;
const completeUrl = `https://${VERCEL_URL}/api/complete`;

module.exports = {
  useEnv: true,
  origin: VERCEL_URL,
  completeUrl,
  oauthProvider: 'github',
  adminPanelUrl: '/admin',
};
