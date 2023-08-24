const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully connected to MongoDB.');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const connection = mongoose.connection;

module.exports = { connection };
