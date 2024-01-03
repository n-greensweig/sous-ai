const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// POST saved recipe to the DB
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

// GET all recipes from the DB
router.get('/', (req, res) => {

    let queryText = `
SELECT * FROM "recipe_item" WHERE "user_id" = $1;
`;
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error('Error getting recipes from DB:', error);
            res.sendStatus(400);
        });

});

// GET recipe details from the DB
router.get('/:id', (req, res) => {
    let queryText = `
SELECT * FROM "recipe_item" WHERE "user_id" = $1 AND "id" = $2;
`;
    pool.query(queryText, [req.user.id, req.params.id])
        .then(result => {
            res.send(result.rows.length > 0 ? result.rows[0] : {});
        })
        .catch(error => {
            console.error('Error getting recipe details from DB:', error);
            res.sendStatus(400);
        });

});

// GET recipe details from the DB
router.get('/comments/:id', (req, res) => {
    let queryText = `
    SELECT * FROM "comments" WHERE "user_id" = $1 AND "recipe_id" = $2;
`;
    pool.query(queryText, [req.user.id, req.params.id])
        .then(result => {
            res.send(result.rows.length > 0 ? result.rows[0] : {});
        })
        .catch(error => {
            console.error('Error getting recipe details from DB:', error);
            res.sendStatus(400);
        });

});

// DELETE selected recipe from the DB
router.delete('/:id', (req, res) => {
    let queryText = `
DELETE FROM "recipe_item" WHERE "user_id" = $1 AND "id" = $2;
`;
    pool.query(queryText, [req.user.id, req.params.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error deleting recipe from DB:', error);
            res.sendStatus(500);
        });

});

// PUT request to update recipe title in the DB
router.put('/:id', (req, res) => {
    let queryText = `
    UPDATE "recipe_item" SET "title" = $1
    WHERE "user_id" = $2 AND "id" = $3;
    `;
    pool.query(queryText, [req.body.title, req.user.id, req.params.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
});

module.exports = router;