const dotenv = require('dotenv');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const app = require('./app');

dotenv.config({ path: '.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose.set('strictQuery', false);

mongoose.connect(DB).then(() => console.log('DB connected!'));

const options = {
  key: fs.readFileSync('/Users/kahutyryak/Projects/key.pem'),
  cert: fs.readFileSync('/Users/kahutyryak/Projects/cert.pem'),
};

const PORT = 3000;

https.createServer(options, app).listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
