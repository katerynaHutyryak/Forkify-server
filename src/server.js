const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: ".env" });


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
});