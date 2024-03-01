const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// POST saved recipe to the DB
router.post('/', rejectUnauthenticated, (req, res) => {

    let recipeJSON = JSON.parse(req.body.message);
    let recipePhoto;

    if (recipeJSON.recipe_name.includes('Smoothie')) {
        recipePhoto = `images/smoothie.png`;
    } else if (recipeJSON.recipe_name.includes('Pizza')) {
        recipePhoto = `images/pizza.png`;
    } else if (recipeJSON.recipe_name.includes('Salad')) {
        recipePhoto = `images/salad.png`;
    } else if (recipeJSON.recipe_name.includes('Soup')) {
        recipePhoto = `images/soup.png`;
    } else if (recipeJSON.recipe_name.includes('Stew')) {
        recipePhoto = `images/stew.png`;
    } else if (recipeJSON.recipe_name.includes('Cake')) {
        recipePhoto = `images/cake.png`;
    } else if (recipeJSON.recipe_name.includes('Pie')) {
        recipePhoto = `images/pie.png`;
    } else if (recipeJSON.recipe_name.includes('Taco')) {
        recipePhoto = `images/tacos.png`;
    } else if (recipeJSON.recipe_name.includes('Pasta') || recipeJSON.recipe_name.includes('Noodles')) {
        recipePhoto = `images/pasta.png`;
    } else if (recipeJSON.recipe_name.includes('Barbecue') || recipeJSON.recipe_name.includes('BBQ')) {
        recipePhoto = `images/barbecue.png`;
    } else if (recipeJSON.recipe_name.includes('Chicken')) {
        recipePhoto = `images/chicken.png`;
    } else if (recipeJSON.recipe_name.includes('Steak')) {
        recipePhoto = `images/steak.png`;
    } else if (recipeJSON.recipe_name.includes('Cheeseburger') || recipeJSON.recipe_name.includes('Burger')) {
        recipePhoto = `images/burger.png`;
    } else if (recipeJSON.recipe_name.includes('Pork')) {
        recipePhoto = `images/pork-chop.png`;
    } else if (recipeJSON.recipe_name.includes('Bread')) {
        recipePhoto = `images/bread.png`;
    } else if (recipeJSON.recipe_name.includes('Sandwich')) {
        recipePhoto = `images/sandwich.png`;
    } else if (recipeJSON.recipe_name.includes('Eggs')) {
        recipePhoto = `images/eggs.png`;
    } else if (recipeJSON.recipe_name.includes('Oatmeal')) {
        recipePhoto = `images/oatmeal.png`;
    } else if (recipeJSON.recipe_name.includes('Rice')) {
        recipePhoto = `images/rice.png`;
    } else if (recipeJSON.recipe_name.includes('Chili')) {
        recipePhoto = `images/chili.png`;
    } else if (recipeJSON.recipe_name.includes('Salmon')) {
        recipePhoto = `images/salmon.png`;
    } else if (recipeJSON.recipe_name.includes('Seafood')) {
        recipePhoto = `images/seafood.png`;
    } else if (recipeJSON.recipe_name.includes('Charcuterie')) {
        recipePhoto = `images/charcuterie.png`;
    } else {
        recipePhoto = `images/generic-plate.png`;
    }

    let queryText = `
INSERT INTO "recipe_item" ("user_id", "title", "prep_time", "cook_time",
 "number_of_servings", "photo", "ingredients", "instructions", "notes")
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
`;
    pool.query(queryText, [
        req.user.id, recipeJSON.recipe_name, recipeJSON.prep_time, recipeJSON.cook_time,
        recipeJSON.number_of_servings, recipePhoto, recipeJSON.ingredients, recipeJSON.instructions, recipeJSON.notes
    ])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error posting recipes to DB:', error);
            res.sendStatus(500);
        });

});

// POST new comment to the DB
router.post('/comments/:id', rejectUnauthenticated, (req, res) => {

    let queryText = `
    INSERT INTO "comments" ("recipe_id", "user_id", "comment")
    VALUES ($1, $2, $3);
    `;
    pool.query(queryText, [req.params.id, req.user.id, req.body.comment])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error posting comment to DB:', error);
            res.sendStatus(500);
        });

});

// GET all recipes from the DB
router.get('/', rejectUnauthenticated, (req, res) => {

    let queryText = `
SELECT 
    "recipe_item".*,
    COALESCE(
        (SELECT "images"."path"
         FROM "images"
         WHERE "images"."recipe_id" = "recipe_item"."id"
         ORDER BY "images"."created_at" DESC
         LIMIT 1),
        "recipe_item"."photo"
    ) AS "display_photo"
FROM 
    "recipe_item"
WHERE
    "recipe_item"."user_id" = $1
ORDER BY 
    "recipe_item"."id" DESC;`;
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
router.get('/:id', rejectUnauthenticated, (req, res) => {
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

// GET recipe comments from the DB
router.get('/comments/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `
    SELECT * FROM "comments" WHERE "user_id" = $1 AND "recipe_id" = $2;
`;
    pool.query(queryText, [req.user.id, req.params.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error('Error getting recipe comments from DB:', error);
            res.sendStatus(400);
        });

});

// DELETE selected recipe from the DB
router.delete('/:id', rejectUnauthenticated, (req, res) => {

    // Must first delete comments associated with the recipe
    let firstQueryText = `
DELETE FROM "comments" WHERE "user_id" = $1 AND "recipe_id" = $2;
`;

    // Must then delete images associated with the recipe
    let secondQueryText = `
DELETE FROM "images" WHERE "user_id" = $1 AND "recipe_id" = $2;
`;

    let queryText = `
DELETE FROM "recipe_item" WHERE "user_id" = $1 AND "id" = $2;
`;

    pool.query(firstQueryText, [req.user.id, req.params.id])
        .then(result => {
            // Next, delete recipe images from DB
            pool.query(secondQueryText, [req.user.id, req.params.id]);
            // Next, delete recipe from DB
            pool.query(queryText, [req.user.id, req.params.id]);
            res.sendStatus(201);
        })
        .catch(error => {
            console.error('Error deleting recipe from DB:', error);
            res.sendStatus(500);
        });


});

// DELETE selected comment from the DB
router.delete('/:id/comment/:recipeId', rejectUnauthenticated, (req, res) => {

    // Must first delete comments associated with the recipe
    let firstQueryText = `
DELETE FROM "comments" WHERE "user_id" = $1 AND "recipe_id" = $2 AND "id" = $3;
`;

    pool.query(firstQueryText, [req.user.id, req.params.id, req.params.recipeId])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.error('Error deleting comment from DB:', error);
            res.sendStatus(500);
        });


});

// PUT request to update recipe title in the DB
router.put('/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `
    UPDATE "recipe_item" SET "title" = $1
    WHERE "user_id" = $2 AND "id" = $3;
    `;
    pool.query(queryText, [req.body.title, req.user.id, req.params.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error updating recipe title in DB:', error);
            res.sendStatus(500);
        });
});

module.exports = router;