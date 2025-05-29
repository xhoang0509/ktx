const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes');
const { AppDataSource, RoomModel } = require('./models/db');
const Schedule = require('./schedules');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Phục vụ các file tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', router);


AppDataSource.initialize().then(async () => {
    console.log('Connect to database');

    app.listen(PORT, () => {
        console.log(`Server is running on port: http://localhost:${PORT}`);
        Schedule.initial();
    });
})
    .catch((err) => {
        console.error('Database connection failed: ', err);
    }) 