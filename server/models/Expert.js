const { Schema, model } = require('mongoose');
const { messageSchema } = require('./Message.js');

const expertSchema = new Schema({
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
  expertise: {
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
    trim: true,
  },
});

const Expert = model('Expert', expertSchema);

module.exports = Expert;
