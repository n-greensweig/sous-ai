const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// POST saved recipe list to the DB
router.post('/list', rejectUnauthenticated, (req, res) => {
    let queryText = `
INSERT INTO "recipe_list" ("user_id", "list_name")
VALUES ($1, $2);
`;
    pool.query(queryText, [req.user.id, req.body.listName])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error posting recipe list to DB:', error);
            res.sendStatus(500);
        });
});

// POST saved recipe to the DB
router.post('/', rejectUnauthenticated, (req, res) => {
    let recipeJSON = JSON.parse(req.body.message);
    let recipePhoto;
    if (recipeJSON.recipe_name.includes('Smoothie')) {
        recipePhoto = `images/food/smoothie.png`;
    } else if (recipeJSON.recipe_name.includes('Pizza')) {
        recipePhoto = `images/food/pizza.png`;
    } else if (recipeJSON.recipe_name.includes('Salad')) {
        recipePhoto = `images/food/salad.png`;
    } else if (recipeJSON.recipe_name.includes('Soup')) {
        recipePhoto = `images/food/soup.png`;
    } else if (recipeJSON.recipe_name.includes('Stew')) {
        recipePhoto = `images/food/stew.png`;
    } else if (recipeJSON.recipe_name.includes('Cake')) {
        recipePhoto = `images/food/cake.png`;
    } else if (recipeJSON.recipe_name.includes('Pie')) {
        recipePhoto = `images/food/pie.png`;
    } else if (recipeJSON.recipe_name.includes('Taco')) {
        recipePhoto = `images/food/tacos.png`;
    } else if (recipeJSON.recipe_name.includes('Pasta') || recipeJSON.recipe_name.includes('Noodles')) {
        recipePhoto = `images/food/pasta.png`;
    } else if (recipeJSON.recipe_name.includes('Barbecue') || recipeJSON.recipe_name.includes('BBQ')) {
        recipePhoto = `images/food/barbecue.png`;
    } else if (recipeJSON.recipe_name.includes('Chicken')) {
        recipePhoto = `images/food/chicken.png`;
    } else if (recipeJSON.recipe_name.includes('Steak')) {
        recipePhoto = `images/food/steak.png`;
    } else if (recipeJSON.recipe_name.includes('Cheeseburger') || recipeJSON.recipe_name.includes('Burger')) {
        recipePhoto = `images/food/burger.png`;
    } else if (recipeJSON.recipe_name.includes('Pork')) {
        recipePhoto = `images/food/pork-chop.png`;
    } else if (recipeJSON.recipe_name.includes('Bread')) {
        recipePhoto = `images/food/bread.png`;
    } else if (recipeJSON.recipe_name.includes('Sandwich')) {
        recipePhoto = `images/food/sandwich.png`;
    } else if (recipeJSON.recipe_name.includes('Eggs')) {
        recipePhoto = `images/food/eggs.png`;
    } else if (recipeJSON.recipe_name.includes('Oatmeal')) {
        recipePhoto = `images/food/oatmeal.png`;
    } else if (recipeJSON.recipe_name.includes('Rice')) {
        recipePhoto = `images/food/rice.png`;
    } else if (recipeJSON.recipe_name.includes('Chili')) {
        recipePhoto = `images/food/chili.png`;
    } else if (recipeJSON.recipe_name.includes('Salmon')) {
        recipePhoto = `images/food/salmon.png`;
    } else if (recipeJSON.recipe_name.includes('Seafood')) {
        recipePhoto = `images/food/seafood.png`;
    } else if (recipeJSON.recipe_name.includes('Charcuterie')) {
        recipePhoto = `images/food/charcuterie.png`;
    } else {
        recipePhoto = `images/food/generic-plate.png`;
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

// GET all recipes from the DB with optional search query, only those viewed within the last day
router.get('/recent', rejectUnauthenticated, (req, res) => {
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
            AND "recipe_item"."last_viewed" > CURRENT_TIMESTAMP - INTERVAL '7 days'
            ${req.query.q ? 'AND "title" ILIKE $2' : ''}
        ORDER BY 
            "recipe_item"."last_viewed" DESC;
    `;

    const queryParams = [req.user.id];
    if (req.query.q) {
        queryParams.push(`%${req.query.q}%`);
    }

    pool.query(queryText, queryParams)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error('Error getting recent recipes from DB:', error);
            res.sendStatus(400);
        });
});

// GET all recipes from the DB with optional search query
router.get('/cooked', rejectUnauthenticated, (req, res) => {
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
            "recipe_item"."user_id" = $1 AND "recipe_item"."is_cooked" = TRUE
            ${req.query.q ? 'AND "title" ILIKE $2' : ''}
        ORDER BY 
            "recipe_item"."id" DESC;
    `;

    const queryParams = [req.user.id];
    if (req.query.q) {
        queryParams.push(`%${req.query.q}%`);
    }

    pool.query(queryText, queryParams)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error('Error getting recent recipes from DB:', error);
            res.sendStatus(400);
        });
});

// GET all cooked recipes from the DB with optional search query
router.get('/cooked', rejectUnauthenticated, (req, res) => {
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
            "recipe_item"."user_id" = $1 AND "recipe_item"."is_cooked" = TRUE
            ${req.query.q ? 'AND "title" ILIKE $2' : ''}
        ORDER BY 
            "recipe_item"."id" DESC;
    `;

    const queryParams = [req.user.id];
    if (req.query.q) {
        queryParams.push(`%${req.query.q}%`);
    }

    pool.query(queryText, queryParams)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error('Error getting cooked recipes from DB:', error);
            res.sendStatus(400);
        });
});

// GET recipe details from the DB and update last_viewed timestamp
router.get('/:id', rejectUnauthenticated, async (req, res) => {
    const connection = await pool.connect();

    try {
        // Start a transaction
        await connection.query('BEGIN');

        // Update the last_viewed timestamp
        let updateQuery = `
            UPDATE "recipe_item" 
            SET "last_viewed" = CURRENT_TIMESTAMP 
            WHERE "user_id" = $1 AND "id" = $2;
        `;
        await connection.query(updateQuery, [req.user.id, req.params.id]);

        // Fetch the recipe details
        let selectQuery = `
            SELECT * FROM "recipe_item" 
            WHERE "user_id" = $1 AND "id" = $2;
        `;
        const result = await connection.query(selectQuery, [req.user.id, req.params.id]);

        // Commit the transaction
        await connection.query('COMMIT');

        // Send response
        res.send(result.rows.length > 0 ? result.rows[0] : {});
    } catch (error) {
        // Rollback the transaction on error
        await connection.query('ROLLBACK');
        console.error('Error getting recipe details from DB:', error);
        res.sendStatus(400);
    } finally {
        connection.release();
    }
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

// PUT request to update recipe rating in the DB
router.put('/rating/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `
    UPDATE "recipe_item" SET "rating" = $1
    WHERE "user_id" = $2 AND "id" = $3;
    `;
    pool.query(queryText, [req.body.rating, req.user.id, req.params.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error updating recipe rating in DB:', error);
            res.sendStatus(500);
        });
});

// PUT request to update recipe is_cooked value in the DB
router.put('/cooked/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `
    UPDATE "recipe_item" SET "is_cooked" = $1
    WHERE "user_id" = $2 AND "id" = $3;
    `;
    pool.query(queryText, [req.body.isCooked, req.user.id, req.params.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error updating recipe is_cooked in DB:', error);
            res.sendStatus(500);
        });
});

// GET recipe lists from the DB
router.get('/list/recipes', rejectUnauthenticated, (req, res) => {
    let queryText = `
    SELECT * FROM "recipe_list" WHERE "user_id" = $1;
`;
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error('Error getting recipe lists from DB:', error);
            res.sendStatus(400);
        });
});

// POST recipe to recipe list in the DB
router.post('/list/recipes', rejectUnauthenticated, (req, res) => {
    let queryText = `
    INSERT INTO "recipe_list_recipes" ("user_id", "list_id", "recipe_id")
    VALUES ($1, $2, $3);
    `;
    pool.query(queryText, [req.user.id, req.body.listId, req.body.recipeId])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error posting recipe to recipe list in DB:', error);
            res.sendStatus(500);
        });
});

module.exports = router;