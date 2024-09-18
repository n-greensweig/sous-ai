// Import express to create route handlers
const express = require('express');
// Initialize the express router to define route endpoints
const router = express.Router();
// Import the pool module for database connections
const pool = require('../modules/pool.js');
// Import authentication middleware to protect routes
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  // Handle DELETE requests
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const imageId = req.params.id;
    const userId = req.user.id;
    console.log(imageId, userId);
    // SQL query to delete the image where id matches and belongs to the user
    const queryText = `DELETE FROM "images" WHERE "id" = $1 AND "user_id" = $2;`;

    console.log(queryText);

    pool.query(queryText, [imageId, userId])
        .then((result) => {
            if (result.rowCount > 0) {
                console.log(result);
                res.sendStatus(204); // No Content
            } else {
                res.sendStatus(403); // Forbidden
            }
        })
        .catch((error) => {
            console.error(`Error deleting image ${imageId}`, error);
            res.sendStatus(500);
        });
});


/**
 * Route to fetch all images for a specific recipe belonging to the authenticated user.
 * It requires the user to be authenticated and uses their ID along with a recipe ID.
 */
router.get('/:id', (req, res) => {
    // SQL query to select all images from the "images" table where the user_id and recipe_id match the request
    const queryText = `SELECT * FROM "images" WHERE "recipe_id" = $1 ORDER BY "path" DESC;`;
    // Execute the query with user id and recipe id as parameters
    pool.query(queryText, [req.params.id])
        .then((result) => {
            // On success, send back the images to the client
            res.send(result.rows);
        })
        .catch((error) => {
            // Log and respond with an error status if the query fails
            console.error(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        });
});

/**
 * Route to add a new image to the database associated with a specific recipe and user.
 * This route is also protected by authentication middleware.
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    // Extract image path, recipe ID, and user ID from the request body and user object
    const path = req.body.path;
    const recipeID = req.body.recipeID;
    const userID = req.user.id;
    // SQL query to insert a new image record into the "images" table
    const queryText = `INSERT INTO "images" ("recipe_id", "user_id", "path") VALUES ($1, $2, $3);`;
    // Execute the insertion query with provided parameters
    pool.query(queryText, [recipeID, userID, path])
        .then((result) => {
            // Log success and send a created status back to the client
            console.error(`Added image to the database`, path);
            res.sendStatus(201);
        })
        .catch((error) => {
            // Log and respond with an error status if the query fails
            console.error(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        });
});

// Export the router to be mounted by the main Express app
module.exports = router;