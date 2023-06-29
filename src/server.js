const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
});

dotenv.config({ path: '.env' });

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE).then(() => console.log('DB connected!'));

const PORT = 3000;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`app is running on port ${PORT}`));
