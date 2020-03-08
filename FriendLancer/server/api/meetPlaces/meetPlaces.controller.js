'use strict';
const MeetPlace = require('./meetPlaces.model');
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
function listAllMeetPlaces(req, res) {
  return MeetPlace.find({})
    .exec() // execute query
    .then(meetPlaces => { // if forums
      // respond to user with 200 (success) and json encode the users
      res.status(200).json(meetPlaces);
    })
    .catch(handleError(res)); // catch any errors and send them to the custom error handler function
}


function searchMeetPlaces(req, res) {
  return MeetPlace.find(req.body)
    .exec() // execute query
    .then(meetPlaces => { // if forums
      // respond to user with 200 (success) and json encode the users
      res.status(200).json(meetPlaces);
    })
    .catch(handleError(res)); // catch any errors and send them to the custom error handler function
}

/**
 * Find a user by a specific email, we will send a request to this function in a GET request
 * saving the email in the request.param.id field
 */
function findMeetPlaceByName(req, res) {
  console.log('req.params.id: ' + req.params.meetPlaceName);
  MeetPlace.findOne({
    meetPlaceName: req.body.meetPlaceName
  }).then(meetPlace => {
    if (!meetPlace) {
      res.send({
        message: false
      });
    }
    else {
      res.json({
        meetPaceName: meetPlace.meetPlaceName,
        meetPlaceType: meetPlace.meetPlaceType,
        meetPlaceLocation: meetPlace.meetPlaceLocation
      });
    }
  }).catch(validationError(res));
}


function createMeetPlace(req, res) {
  var query = req.body.meetPlaceName;
  console.log("query: " + query);
  MeetPlace.findOne({"meetPaceName": query}, function(err, meetPlace) {
    if (err) {
      console.log(err);
    }
    else if (meetPlace) {
      res.json({ message: false});
    }
    else {
      // Define the new forum, give the constructor the req.body containing all fields
      let newMeetPlace = new MeetPlace(req.body);
      // Now lets save the user
      return newMeetPlace.save().then(function (meetPlace) { // then when the forum saves
        // We will be returning only a few fields that we should need.
        res.json({
          meetPlaceName: meetPlace.meetPaceName,
          meetPlaceType: meetPlace.meetPlaceType,
          meetPlaceLocation: meetPlace.meetPlaceLocation,
        }); // let's return the forum entry to the person
      }).catch(validationError(res)); // catch any errors
    }
  });
}

function editMeetPlace(req, res) {
  console.log("editMeetPlace");
  var query = {'meetPlaceName': req.body.meetPlaceName};
  req.newData = {
    meetPlaceName: req.body.meetPlaceName,
    meetPlaceType: req.body.meetPlaceType,
    meetPlaceLocation: req.body.meetPlaceLocation
  };

  MeetPlace.findOneAndUpdate(query, req.newData, {upsert: false}, function(err, meetPlace) {
    if (err) return res.send({message: false});
    return res.send(req.newData);
  });
}


// Any functions we create, we want to return these functions to the express app to use.
module.exports = { listAllMeetPlaces, findMeetPlaceByName, createMeetPlace, editMeetPlace, searchMeetPlaces};
