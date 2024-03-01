const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

// GET route to get all the images from the database
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "images" WHERE
    "user_id" = $1 and "recipe_id" = $2 ORDER BY "path" DESC;
    ;`;
    pool.query(queryText, [req.user.id, req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500); // Good server always responds
        });
});


// Setup a POST route to add a new image to the database
router.post('/', rejectUnauthenticated, (req, res) => {
    const path = req.body.path;
    const recipeID = req.body.recipeID;
    const userID = req.user.id;
    const queryText = `INSERT INTO "images" ("recipe_id", "user_id", "path")
                     VALUES ($1, $2, $3);`;
    pool.query(queryText, [recipeID, userID, path])
        .then((result) => {
            console.log(`Added image to the database`, path);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500); // Good server always responds
        });
});


module.exports = router;