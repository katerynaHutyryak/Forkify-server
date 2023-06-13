const dotenv = require('dotenv');
const mongoose = require('mongoose');
const https = require('https');
const { auth, requiresAuth } = require('express-openid-connect');
const fs = require('fs');
const app = require('./app');

dotenv.config({ path: '.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose.set('strictQuery', false);

mongoose.connect(DB).then(() => console.log('DB connected!'));

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

app.use(auth(config));

app.get('/api/v1', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const options = {
  key: fs.readFileSync('/Users/kahutyryak/Projects/key.pem'),
  cert: fs.readFileSync('/Users/kahutyryak/Projects/cert.pem'),
};

const PORT = 3000;

https.createServer(options, app).listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

module.exports = config;
