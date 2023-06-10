const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: '../.env' });

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose.set('strictQuery', false);

mongoose.connect(DB).then(() => console.log('DB connected!'));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
