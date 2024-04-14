const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;
