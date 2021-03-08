const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  comment: { type: String },
  postId: { type: String },
  user: { type: {}, required: true }
});

module.exports = mongoose.model('Comment', commentSchema);