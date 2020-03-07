'use strict';
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const config = require('../../config');
/**
 * Handles validation errors and returns the error to the user.
 * @param {Express.Response} res - an Express Response object
 * @param {number} statusCode - the result status code number
 */
function validationError(res, statusCode) {
}

/**
 * handles error codes and sends the status code to the user.
 * @param {Express.Response} res - an Express Response object
 * @param {number} statusCode -  the result status code number
 */
function handleError(res, statusCode) {
}

/**
 * This function will search for all users in the users collection and show the
 * details, except for the salt and password
 * @param {Express.Request} req  - Express request object with possible parameters
 * @param {Express.Response} res - Express response object.
 */
function listAllUsers(req, res) {
  return User.find({}, '-salt -password') // find all users, exclude salt and password from query
    .exec() // execute query
    .then(users => { // if users
      // respond to user with 200 (success) and json encode the users
      res.status(200).json(users);
    })
    .catch(handleError(res)); // catch any errors and send them to the custom error handler function
}

/**
 * Find a user by a specific email, we will send a request to this function in a GET request
 * saving the email in the request.param.id field
 */
function findUserByEmail(req, res) {
  console.log('req.params.id: ' + req.params.id);
  // Find user by email
  User.findOne({
    email: req.body.email
  }).then(user => {
    // Once we find the user, now let's pass the password from req.body to authenticate
    if (!user) {
      // Return false, user not even registered, but let's not tell them.
      res.send({
        message: false
      });
    }
    else {
      res.json({
        fullName: user.fullName,
        id: user._id,
        email: user.email,
        city: user.city,
        profession: user.profession,
        role: user.role
      });
    }
  }).catch(validationError(res));
}

/**
 * Create a user and save it to the DB. We will send the user details in a POST request in the body of the post.
 */
function create(req, res) {
    var query = req.body.email;
    console.log(query);
    User.findOne({"email": query}, function(err, user) {
      if (err) {
        console.log(err);
      }
      else if (user) {
        res.json({ message: false});
      }
      else {
        // Define the new user, give the constructor the req.body containing all fields
        let newUser = new User(req.body);
        // if role not defined, lets give it a default user role, although our model should handle this
        newUser.role = 'user';
        // Now lets save the user
        return newUser.save().then(function (user) { // then when the user saves
          // We will be returning only a few fields that we should need.
          res.json({
            fullName: user.fullName,
            _id: user._id,
            role: user.role,
            email: user.email,
            city: user.city,
            profession: user.profession,
          }); // let's return the user entry to the person
          // NOTE: We are not currently encrypting the user password, this is bad.
        }).catch(validationError(res)); // catch any errors
      }
    });
}

function login(req, res) {
  // Find user by email
  User.findOne({
    email: req.body.email
  }).then(user => {
    // Once we find the user, now let's pass the password from req.body to authenticate
    if (!user) {
      // Return false, user not even registered, but let's not tell them.
      res.send({
        message: false
      });
    }
    else {
      user.authenticate(req.body.password, function (authErr, authenticated) {
        if (authErr) {
          res.send(authErr);
        }
        if (!authenticated) {
          // Return false, password invalid
          res.send({
            message: false
          });
        } else {
          // User is authenticated, let's created a webtoken
          const token = jwt.sign({
            _id: user._id
          }, config.secrets.session, {
            expiresIn: 60 * 60 * 5 // set expire time for token
          });
          // Let's return the created JSON Web token with some fields from the user Model
          // we can use these fields to populate in the application who this logged in user is.
          res.json({
            token: token,
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            city: user.city,
            profession: user.profession,
          });
        }
      });
    }
  }).catch(validationError(res));
}

// Any functions we create, we want to return these functions to the express app to use.
module.exports = { listAllUsers, findUserByEmail, create, login};
