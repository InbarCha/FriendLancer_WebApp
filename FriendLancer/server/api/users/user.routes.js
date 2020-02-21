'use strict';
const express = require('express');
// Import the Controller so we may assign specific functions to a route
const controller = require('./user.controller');

// Assign the route variable to an Express.Route handler
const router = express.Router();

/**
 * path: /api/user
 * method: GET
 * function: listAllUsers() in the users.controller.js file
 */
router.get('/', controller.listAllUsers);
/**
 * path: /api/users
 * method: POST
 * function: create() in the users.controller.js file
 */
router.post('/', controller.create);
/**
 * path: /api/users/:id     ->   example: http://localhost:3000/api/users/xavidram@sample.com
 * method: GET
 * function: findUserByEmail() in the users.controller.js file
 */
router.get('/:id', controller.findUserByEmail);

// We export the routes to the express app, in the routes.js file we will assign the base URL for this endpoint.
// in this file we simply want to specify the path after the base /api/users url.
module.exports = router;
