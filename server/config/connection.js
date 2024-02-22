const mongoose = require('mongoose');

// connect to mongodb database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/journMEy');

module.exports = mongoose.connection;