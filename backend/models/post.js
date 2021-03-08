const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  userId: { type: String, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
  userRead: { type: [String] }
});

module.exports = mongoose.model('Post', postSchema);