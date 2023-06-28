/* eslint-disable import/no-extraneous-dependencies */
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

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

const server = https.createServer(options, app).listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
