const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/merndb');
console.log(`MongoDB Connected`.red);

module.exports = mongoose.connection;
