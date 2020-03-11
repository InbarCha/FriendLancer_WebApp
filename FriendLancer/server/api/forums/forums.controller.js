'use strict';
const Forum = require('./forums.model');
const jwt = require('jsonwebtoken');
const config = require('../../config');

function validationError(res, statusCode) {
}

function handleError(res, statusCode) {
}

/**
 * This function will search for all forums in the forums collection and show the
 * details
 * @param {Express.Request} req  - Express request object with possible parameters
 * @param {Express.Response} res - Express response object.
 */
function listAllForums(req, res) {
  return Forum.find({})
    .exec() // execute query
    .then(forums => { // if forums
      // respond to user with 200 (success) and json encode the users
      res.status(200).json(forums);
    })
    .catch(handleError(res)); // catch any errors and send them to the custom error handler function
}

/**
 * Find a user by a specific email, we will send a request to this function in a GET request
 * saving the email in the request.param.id field
 */
function findForumById(req, res) {
  console.log('req.params.id: ' + req.params.forumId);
  // Find user by email
  Forum.findOne({
    forumId: req.body.forumId
  }).then(forum => {
    // Once we find the user, now let's pass the password from req.body to authenticate
    if (!forum) {
      // Return false, user not even registered, but let's not tell them.
      res.send({
        message: false
      });
    }
    else {
      res.json({
        forumName: forum.forumName,
        forumId: forum.forumId,
      });
    }
  }).catch(validationError(res));
}

/**
 * Create a forum and save it to the DB. We will send the forum details in a POST request in the body of the post.
 */
function createForum(req, res) {
  var query = req.body.forumId;
  console.log(query);
  Forum.findOne({"forumId": query}, function(err, forum) {
    if (err) {
      console.log(err);
    }
    else if (forum) {
      res.json({ message: false});
    }
    else {
      // Define the new forum, give the constructor the req.body containing all fields
      let newForum = new Forum(req.body);
      // Now lets save the user
      return newForum.save().then(function (forum) { // then when the forum saves
        // We will be returning only a few fields that we should need.
        res.json({
          forumName: forum.forumName,
          forumId: forum.forumId,
        }); // let's return the forum entry to the person
      }).catch(validationError(res)); // catch any errors
    }
  });
}

function editForum(req, res) {
  console.log("editForum");
  var query = {'forumId': req.body.forumId};
  req.newData = {
    forumName: req.body.forumName,
    forumId: req.body.forumId
  };

  Forum.findOneAndUpdate(query, req.newData, {upsert: false}, function(err, forum) {
    if (err) return res.send({message: false});
    return res.send(req.newData);
  });
}


// Any functions we create, we want to return these functions to the express app to use.
module.exports = { listAllForums, findForumById, createForum, editForum};
