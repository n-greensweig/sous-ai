const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// POST saved recipe to the server
router.post('/', (req, res) => {

    let queryText = `
INSERT INTO "recipe_item" ("user_id", "title", "instructions")
VALUES ($1, $2, $3);
`;
    pool.query(queryText, [req.user.id, req.body.title, req.body.instructions])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });

});

module.exports = router;