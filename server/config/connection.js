const mongoose = require('mongoose');

// connect to mongodb database
mongoose.connect(process.env.MONGODB_URI);

module.exports = mongoose.connection;