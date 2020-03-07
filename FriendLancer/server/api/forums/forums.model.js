const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const crypto = require('crypto');
const Schema = mongoose.Schema; // Mongoose model is a Schema

// User Model Definition below
const ForumsSchema = new Schema({
  forumName: String,
  forumId:String,
});

/**
 * Export mongoose.model() which can take up to 3 parameters
 * @param {string} ModelName - The name of the model in thise case 'User'
 * @param {mongoose.Schema} UserSchema - The Schema variable we created
 * @param {string} CollectionName - name of the collection User model saves to.
 */
module.exports = mongoose.model('Forum', ForumsSchema, 'forums');
