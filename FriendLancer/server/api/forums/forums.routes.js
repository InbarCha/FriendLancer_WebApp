'use strict';
const express = require('express');
// Import the Controller so we may assign specific functions to a route
const controller = require('./forums.controller');

// Assign the route variable to an Express.Route handler
const router = express.Router();

/**
 * path: /api/forums
 * method: GET
 * function: listAllForums() in the forums.controller.js file
 */
router.get('/', controller.listAllForums);
/**
 * path: /api/forums
 * method: POST
 * function: createForum() in the forums.controller.js file
 */
router.post('/', controller.createForum);

/**
 * path: /api/forums/:id     ->   example: http://localhost:3000/api/forums/{forumId}
 * method: GET
 * function: findForumById() in the forums.controller.js file
 */
router.get('/:id', controller.findForumById);

/**
 * path: /api/forums/:id     ->   example: http://localhost:3000/api/forums/{forumId}
 * method: POST
 * function: editForum() in the forums.controller.js file
 */
router.post('/:id', controller.editForum);

// We export the routes to the express app, in the routes.js file we will assign the base URL for this endpoint.
// in this file we simply want to specify the path after the base /api/users url.
module.exports = router;
