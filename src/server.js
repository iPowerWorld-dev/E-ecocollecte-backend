const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const db = require('./models');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test DB connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Sync DB
db.sequelize.sync();

// Import Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

// Route Middlewares
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
