const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: Image,
    required: true,
    trim: true,
  },
});

const Message = model('Message', messageSchema);

module.exports = { Message, messageSchema };
