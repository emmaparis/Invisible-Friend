const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/merndb');
console.log(`MongoDB Connected`.red);

module.exports = mongoose.connection;
