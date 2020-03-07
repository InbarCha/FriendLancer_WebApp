const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const crypto = require('crypto');
const Schema = mongoose.Schema; // Mongoose model is a Schema

// User Model Definition below
const PostsSchema = new Schema({
  postTitle: String,
  postSubject: String,
  postId: String,
  forumId: String,
  forumName: String,
  postLocation: String,
  postParticipants: Array,
});

/**
 * Export mongoose.model() which can take up to 3 parameters
 * @param {string} ModelName - The name of the model in thise case 'User'
 * @param {mongoose.Schema} UserSchema - The Schema variable we created
 * @param {string} CollectionName - name of the collection User model saves to.
 */
module.exports = mongoose.model('Post', PostsSchema, 'posts');
