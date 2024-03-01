const mongoose = require('mongoose');
require('dotenv').config();

// connect to mongodb database
mongoose.connect(process.env.MONGODB_URI);

module.exports = mongoose.connection;