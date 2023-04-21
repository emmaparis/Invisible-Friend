const { Schema, model } = require('mongoose');

const { messageSchema } = require('./Message.js');

const friendSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  language: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  mood: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  history: {
    type: [messageSchema],
    default: [],
  },
  avatar: {
    type: String,
<<<<<<< HEAD
    trim: true,
  },
=======
    trim: true, 
  }
>>>>>>> 54e88de84a81e76e8d3f55f26415e519cc3247f1
});

const Friend = model('Friend', friendSchema);

module.exports = Friend;
