'use strict';
const express = require('express');
// Import the Controller so we may assign specific functions to a route
const controller = require('./meetPlaces.controller');

// Assign the route variable to an Express.Route handler
const router = express.Router();

/**
 * path: /api/meetPlaces
 * method: GET
 * function: listAllMeetPlaces() in the meetPlaces.controller.js file
 */
router.get('/', controller.listAllMeetPlaces);

/**
 * path: /api/meetPlaces
 * method: POST
 * function: createMeetPlace() in the meetPlaces.controller.js file
 */
router.post('/', controller.createMeetPlace);

router.post('/searchMeetPlace', controller.searchMeetPlaces);

/**
 * path: /api/meetPlaces/:id     ->   example: http://localhost:3000/api/meetPlaces/{meetPlaceName}
 * method: GET
 * function: findMeetPlaceByName() in the meetPlaces.controller.js file
 */
router.get('/:id', controller.findMeetPlaceByName);

/**
 * path: /api/meetPlaces/:id     ->   example: http://localhost:3000/api/meetPlaces/{meetPlaceName}
 * method: POST
 * function: editMeetPlace() in the meetPlaces.controller.js file
 */
router.post('/:id', controller.editMeetPlace);

// We export the routes to the express app, in the routes.js file we will assign the base URL for this endpoint.
// in this file we simply want to specify the path after the base /api/users url.
module.exports = router;
