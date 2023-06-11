const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');

dotenv.config({ path: '.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose.set('strictQuery', false);

mongoose.connect(DB).then(() => console.log('DB connected!'));

const PORT = 3000;

http.createServer(app).listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
