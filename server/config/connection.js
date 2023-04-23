const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/your_db_name')
console.log(`MongoDB Connected`.red);


module.exports = mongoose.connection;
