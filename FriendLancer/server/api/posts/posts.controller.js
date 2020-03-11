'use strict';
const Post = require('./posts.model');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const geocoder = require('geocoder');

function validationError(res, statusCode) {
}

function handleError(res, statusCode) {
}


function listAllPostsByForumId(req, res) {
  return Post.find({forumId:req.body.forumId})
    .exec() // execute query
    .then(posts => { // if forums
      // respond to user with 200 (success) and json encode the users
      res.status(200).json(posts);
    })
    .catch(handleError(res)); // catch any errors and send them to the custom error handler function
}

function listAllPosts(req, res) {
  return Post.find({})
    .exec() // execute query
    .then(posts => { // if forums
      // respond to user with 200 (success) and json encode the users
      res.status(200).json(posts);
    })
    .catch(handleError(res)); // catch any errors and send them to the custom error handler function
}

function searchPost(req, res) {
  return Post.find(req.body)
    .exec() // execute query
    .then(posts => { // if forums
      // respond to user with 200 (success) and json encode the users
      res.status(200).json(posts);
    })
    .catch(handleError(res)); // catch any errors and send them to the custom error handler function
}

function deletePost(req, res) {
  console.log("req.body.postId: " + req.body.postId );
  Post.remove({ postId: req.body.postId }, function(err) {
      res.send({
        message: true
      });
  });
}

function groupByForumIdAndCount(req, res) {
  const aggregatorOpts = [
    {
      $group :
        {
          _id : "$forumId",
          numOfPosts: { $sum: 1 }
        }
    },
  ];

  Post.aggregate(aggregatorOpts).exec().then(posts=> {
    res.status(200).json(posts);
  }).catch(handleError(res))
}

function groupByForumNameAndCount(req, res) {
  const aggregatorOpts = [
    {
      $group :
        {
          _id : "$forumName",
          numOfPosts: { $sum: 1 }
        }
    },
  ];

  Post.aggregate(aggregatorOpts).exec().then(posts=> {
    res.status(200).json(posts);
  }).catch(handleError(res))
}

function groupByLocationAndCount(req, res) {
  const aggregatorOpts = [
    {
      $group :
        {
          _id : "$postLocation",
          numOfPosts: { $sum: 1 }
        }
    },
  ];

  Post.aggregate(aggregatorOpts).exec().then(posts=> {
    res.status(200).json(posts);
  }).catch(handleError(res))
}

function findPostById(req, res) {
  console.log("findPostById req.body.postId: " + req.body.postId);
  // Find user by email
  Post.findOne({
    postId: req.body.postId
  }).then(post => {
    // Once we find the user, now let's pass the password from req.body to authenticate
    if (!post) {
      // Return false, user not even registered, but let's not tell them.
      res.send({
        message: false
      });
    }
    else {
      res.json({
        postTitle: post.postTitle,
        postSubject: post.postSubject,
        postId: post.postId,
        forumId: post.forumId,
        forumName: post.forumName,
        postLocation: post.postLocation,
        postParticipants: post.postParticipants
      });
    }
  }).catch(validationError(res));
}

/**
 * Create a forum and save it to the DB. We will send the forum details in a POST request in the body of the post.
 */
function createPost(req, res) {
  var query = req.body.postId;
  Post.findOne({"postId": query}, function(err, post) {
    if (err) {
      console.log(err);
    }
    else if (post) {
      res.json({ message: false});
    }
    else {
      // Define the new forum, give the constructor the req.body containing all fields
      let newPost = new Post(req.body);
      // Now lets save the user
      return newPost.save().then(function (post) { // then when the forum saves
        // We will be returning only a few fields that we should need.
        res.json({
          postTitle: post.postTitle,
          postSubject: post.postSubject,
          postId: post.postId,
          forumId: post.forumId,
          forumName: post.forumName,
          postLocation: post.postLocation,
          postParticipants: post.postParticipants
        }); // let's return the forum entry to the person
      }).catch(validationError(res)); // catch any errors
    }
  });
}

function editPost(req, res) {
  var query = {'postId': req.body.postId};
  req.newData = {
    postTitle: req.body.postTitle,
    postSubject: req.body.postSubject,
    postLocation: req.body.postLocation,
    postParticipants: req.body.postParticipants,
  };

  Post.findOneAndUpdate(query, req.newData, {upsert: false}, function(err, post) {
    if (err) return res.send({message: false});
    post.postTitle = req.newData.postTitle;
    post.postSubject = req.newData.postSubject;
    post.postLocation = req.newData.postLocation;
    post.postParticipants = req.newData.postParticipants;
    return res.send(post);
  });
}

// Any functions we create, we want to return these functions to the express app to use.
module.exports = { listAllPostsByForumId, findPostById, createPost, editPost, searchPost,
  listAllPosts, deletePost, groupByForumIdAndCount, groupByForumNameAndCount, groupByLocationAndCount};
