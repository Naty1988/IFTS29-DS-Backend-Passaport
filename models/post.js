const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
      minlength: 5
    },
    date: Date,
    category: {
      type: String,
      enum: [
        'Tecnología',
        'Hogar',
        'País',
        'Mundo',
        'Música',
        'Tendencias',
        'Salud'
      ]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  });
              