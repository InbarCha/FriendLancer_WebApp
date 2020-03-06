const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const crypto = require('crypto');
const Schema = mongoose.Schema; // Mongoose model is a Schema

// User Model Definition below
const UserSchema = new Schema({
  fullName: String,
  city:String,
  profession: String,
  email: String,
  phone: String,
  password: {
    type: String,
    required: true
  },
  // User Role in the application [guest, user, or admin]
  role: {
    type: String,
    default: 'user'
  },
  // Password hash
  salt: String,
});

/**
 * Pre-Hook that targets the Schema's 'save' method.
 */
UserSchema.pre('save', function (next) {
  // If the password field is not modified, skip
  // this entire pre hook and return to the save method
  if (!this.isModified('password')) {
    return next();
  }


  // Check if the password is valid, if it isnt, return an error
  if (!this.validatePresenceOf(this.password)) {
    return next(new Error('Invalid Password'));
  }

  // Make Salt with callback
  this.makeSalt((saltErr, salt) => {
    // if there is an error when creating the salt
    // return with an error response
    if (saltErr) {
      return next(saltErr);
    }
    this.salt = salt;
    // Encrypt the password
    this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
      if (encryptErr) {
        return next(encryptErr);
      }
      this.password = hashedPassword;
      return next();
    });
  });

});

/**
 * Methods for User Schema and manipulating fields
 */
UserSchema.methods = {
  /**
   * Make salt which we will use to encrypt the password
   *
   * @param {Number} [byteSize] - Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String} - returns the ecnrypted string to the function call
   * @api public
   */
  makeSalt(...args) {
    var defaultByteSize = 16;
    let byteSize;
    let callback;

    // if no byteSize is given in the arguments, use the default
    if (typeof args[0] === 'function') {
      callback = args[0];
      byteSize = defaultByteSize;
    } else if (typeof args[1] === 'function') {
      callback = args[1];
    } else {
      throw new Error('Missing Callback');
    }

    if (!byteSize) {
      byteSize = defaultByteSize;
    }

    // Crypto.randomBytes() will generate a random hash based on the given byteSize
    return crypto.randomBytes(byteSize, function (err, salt) {
      if (err) {
        // return the error in the callback, alt will be undefined
        return callback(err);
      } else {
        // return the salt in he callback, error will be undefined as there was none
        return callback(null, salt.toString('base64'));
      }
    });
  },

  validatePresenceOf(value) {
    return value && value.length;
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback - return function
   * @return {String}
   * @api public
   */
  encryptPassword(password, callback) {
    // if password or callback are not specifed, then this is a validation error
    // return
    if (!password || !this.salt) {
      if (!callback) {
        return null;
      } else {
        return callback('Missing password or salt');
      }
    }

    var defaultIterations = 10000;
    var defaultKeyLength = 64;
    var salt = Buffer.from(this.salt, 'base64');

    // if no callback, then encrypt the password using crypto's pbkdf2Sync algorithm
    // using default values
    if (!callback) {
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha256')
        .toString('base64');
    }

    // Otherwise, return the encrypted value in the callback to the original request location
    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha256', function (err, key) {
      if (err) {
        // if error, return error in callback to original call
        return callback(err);
      } else {
        // if no error, return the encrypted password in the callback, err will be null
        return callback(null, key.toString('base64'));
      }
    });
  },

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  authenticate(password, callback) {
    if (!callback) {
      return this.password === this.encryptPassword(password);
    }

    // We encrypt the password passed to login function by user trying to log in
    this.encryptPassword(password, (err, pwdGen) => {
      if (err) {
        return callback(err);
      }
      // if it matches with the password of the user found by email
      if (this.password === pwdGen) {
        // return boolean true
        return callback(null, true);
      } else {
        // otherwise return boolean false
        return callback(null, false);
      }
    });
  },
}

/**
 * Export mongoose.model() which can take up to 3 parameters
 * @param {string} ModelName - The name of the model in thise case 'User'
 * @param {mongoose.Schema} UserSchema - The Schema variable we created
 * @param {string} CollectionName - name of the collection User model saves to.
 */
module.exports = mongoose.model('User', UserSchema, 'users');
