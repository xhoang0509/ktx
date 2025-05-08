const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/Route');
const { AppDataSource } = require('./models/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/api/v1', router);
app.get('/', (req, res) => {
    res.send('Hello World');
});

AppDataSource.initialize().then(() => {
    console.log('Connect to database');

    app.listen(PORT, () => {
        console.log(`Server is running on port: http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error('Database connection failed: ', err);
}) 