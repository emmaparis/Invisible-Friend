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
  image: {
    type: Image,
    required: true,
    trim: true,
  },
  history: {
    type: [messageSchema],
    default: [],
  },
});

const Friend = model('Friend', friendSchema);

module.exports = Friend;
