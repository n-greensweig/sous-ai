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


// Fetch user ingredients
router.get('/user/ingredients', (req, res) => {
    const queryText = `SELECT user_ingredients FROM recipe_preferences WHERE user_id = $1`;
    pool.query(queryText, [req.user.id])
        .then(result => res.send(result.rows[0].user_ingredients))
        .catch(error => {
            console.error('Error fetching user ingredients:', error);
            res.sendStatus(500);
        });
});

// Update user ingredients
router.put('/user/ingredients', (req, res) => {
    const { items } = req.body;
    const queryText = `
        UPDATE recipe_preferences
        SET user_ingredients = $1
        WHERE user_id = $2
    `;
    pool.query(queryText, [items, req.user.id])
        .then(() => res.sendStatus(200))
        .catch(error => {
            console.error('Error updating user ingredients:', error);
            res.sendStatus(500);
        });
});

// POST saved recipe to the DB
router.post('/', rejectUnauthenticated, (req, res) => {
    let recipeJSON = JSON.parse(req.body.message);
    let recipePhoto;
    if (recipeJSON.recipe_name.includes('Smoothie')) {
        recipePhoto = `images/food/smoothie.webp`;
    } else if (recipeJSON.recipe_name.includes('Pizza')) {
        recipePhoto = `images/food/pizza.webp`;
    } else if (recipeJSON.recipe_name.includes('Salad')) {
        recipePhoto = `images/food/salad.webp`;
    } else if (recipeJSON.recipe_name.includes('Soup')) {
        recipePhoto = `images/food/soup.webp`;
    } else if (recipeJSON.recipe_name.includes('Stew')) {
        recipePhoto = `images/food/stew.webp`;
    } else if (recipeJSON.recipe_name.includes('Cake')) {
        recipePhoto = `images/food/cake.webp`;
    } else if (recipeJSON.recipe_name.includes('Pie')) {
        recipePhoto = `images/food/pie.webp`;
    } else if (recipeJSON.recipe_name.includes('Taco')) {
        recipePhoto = `images/food/tacos.webp`;
    } else if (recipeJSON.recipe_name.includes('Pasta') || recipeJSON.recipe_name.includes('Noodles')) {
        recipePhoto = `images/food/pasta.webp`;
    } else if (recipeJSON.recipe_name.includes('Barbecue') || recipeJSON.recipe_name.includes('BBQ')) {
        recipePhoto = `images/food/barbecue.webp`;
    } else if (recipeJSON.recipe_name.includes('Chicken')) {
        recipePhoto = `images/food/chicken.webp`;
    } else if (recipeJSON.recipe_name.includes('Steak')) {
        recipePhoto = `images/food/steak.webp`;
    } else if (recipeJSON.recipe_name.includes('Cheeseburger') || recipeJSON.recipe_name.includes('Burger')) {
        recipePhoto = `images/food/burger.webp`;
    } else if (recipeJSON.recipe_name.includes('Pork')) {
        recipePhoto = `images/food/pork-chop.webp`;
    } else if (recipeJSON.recipe_name.includes('Bread')) {
        recipePhoto = `images/food/bread.webp`;
    } else if (recipeJSON.recipe_name.includes('Sandwich')) {
        recipePhoto = `images/food/sandwich.webp`;
    } else if (recipeJSON.recipe_name.includes('Eggs')) {
        recipePhoto = `images/food/eggs.webp`;
    } else if (recipeJSON.recipe_name.includes('Oatmeal')) {
        recipePhoto = `images/food/oatmeal.webp`;
    } else if (recipeJSON.recipe_name.includes('Rice')) {
        recipePhoto = `images/food/rice.webp`;
    } else if (recipeJSON.recipe_name.includes('Chili')) {
        recipePhoto = `images/food/chili.webp`;
    } else if (recipeJSON.recipe_name.includes('Salmon')) {
        recipePhoto = `images/food/salmon.webp`;
    } else if (recipeJSON.recipe_name.includes('Seafood')) {
        recipePhoto = `images/food/seafood.webp`;
    } else if (recipeJSON.recipe_name.includes('Charcuterie')) {
        recipePhoto = `images/food/charcuterie.webp`;
    } else {
        recipePhoto = `images/food/generic-plate.webp`;
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

router.get('/preferences', rejectUnauthenticated, (req, res) => {
    const queryText = 'SELECT preferences FROM recipe_preferences WHERE user_id = $1';
    pool.query(queryText, [req.user.id])
        .then(result => {
            if (result.rows.length > 0) {
                res.json(result.rows[0].preferences);
            } else {
                res.json([]);
            }
        })
        .catch(error => {
            console.error('Error getting preferences from DB:', error);
            res.sendStatus(400);
        });
});

router.put('/preferences', rejectUnauthenticated, (req, res) => {
    const { preferences } = req.body;
    const queryText = `
        INSERT INTO recipe_preferences (user_id, preferences)
        VALUES ($1, $2)
        ON CONFLICT (user_id) DO UPDATE
        SET preferences = EXCLUDED.preferences,
            last_edited = CURRENT_TIMESTAMP;
    `;
    pool.query(queryText, [req.user.id, preferences])
        .then(result => res.sendStatus(200))
        .catch(error => {
            console.error('Error updating preferences in DB:', error);
            res.sendStatus(500);
        });
});

// GET user household items from the DB
router.get('/household/items', rejectUnauthenticated, (req, res) => {
    const queryText = 'SELECT household_items FROM recipe_preferences WHERE user_id = $1';
    pool.query(queryText, [req.user.id])
        .then(result => {
            if (result.rows.length > 0) {
                res.json(result.rows[0].household_items);
            } else {
                res.json([]);
            }
        })
        .catch(error => {
            console.error('Error getting household items from DB:', error);
            res.sendStatus(400);
        });
});

// PUT to update user household items in the DB
router.put('/household/items', rejectUnauthenticated, (req, res) => {
    const { items } = req.body;
    const queryText = `
        INSERT INTO recipe_preferences (user_id, household_items)
        VALUES ($1, $2)
        ON CONFLICT (user_id) DO UPDATE
        SET household_items = EXCLUDED.household_items,
            last_edited = CURRENT_TIMESTAMP;
    `;
    pool.query(queryText, [req.user.id, items])
        .then(result => res.sendStatus(200))
        .catch(error => {
            console.error('Error updating household items in DB:', error);
            res.sendStatus(500);
        });
});


router.delete('/preferences', rejectUnauthenticated, (req, res) => {
    let queryText = `
    DELETE FROM "recipe_preferences" WHERE "user_id" = $1;
    `;
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error deleting preferences from DB:', error);
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
           ) AS "display_photo",
           array_agg("recipe_list_recipes"."list_id") AS "list_id"
       FROM
           "recipe_item"
       LEFT JOIN
           "recipe_list_recipes" ON "recipe_list_recipes"."recipe_id" = "recipe_item"."id"
       WHERE
           "recipe_item"."user_id" = $1
           ${req.query.q ? 'AND "title" ILIKE $2' : ''}
       GROUP BY
           "recipe_item"."id"
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
           ) AS "display_photo",
           array_agg("recipe_list_recipes"."list_id") AS "list_id"
       FROM
           "recipe_item"
       LEFT JOIN
           "recipe_list_recipes" ON "recipe_list_recipes"."recipe_id" = "recipe_item"."id"
       WHERE
           "recipe_item"."user_id" = $1 AND "recipe_item"."is_cooked" = TRUE
           ${req.query.q ? 'AND "title" ILIKE $2' : ''}
       GROUP BY
           "recipe_item"."id"
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




// GET grocery list from the DB
router.get('/groceries', rejectUnauthenticated, (req, res) => {
    let queryText = `
   SELECT * FROM "grocery_list" WHERE "user_id" = $1 ORDER BY "last_edited" DESC;
`;
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error('Error getting grocery list from DB:', error);
            res.sendStatus(400);
        });
});

// DELETE recipe from grocery list in the DB
router.delete('/groceries/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `
    DELETE FROM "grocery_list" WHERE "user_id" = $1 AND "recipe_id" = $2;
    `;
    let secondQueryText = `
    UPDATE "recipe_item" SET "is_in_grocery_list" = FALSE
    WHERE "user_id" = $1 AND "id" = $2;
    `;
    pool.query(queryText, [req.user.id, req.params.id])
    pool.query(secondQueryText, [req.user.id, req.params.id])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.error('Error deleting recipe from grocery list in DB:', error);
            res.sendStatus(500);
        });
});


// GET recipe details from the DB and update last_viewed timestamp
router.get('/:id', async (req, res) => {
    const connection = await pool.connect();


    try {
        await connection.query('BEGIN');


        let updateQuery = `
           UPDATE "recipe_item"
           SET "last_viewed" = CURRENT_TIMESTAMP
           WHERE "id" = $1;
       `;
        await connection.query(updateQuery, [req.params.id]);


        let selectQuery = `
           SELECT * FROM "recipe_item"
           WHERE "id" = $1;
       `;
        const result = await connection.query(selectQuery, [req.params.id]);


        await connection.query('COMMIT');
        res.send(result.rows.length > 0 ? result.rows[0] : {});
    } catch (error) {
        await connection.query('ROLLBACK');
        console.error('Error getting recipe details from DB:', error);
        res.sendStatus(400);
    } finally {
        connection.release();
    }
});


// GET recipe comments from the DB
router.get('/comments/:id', (req, res) => {
    let queryText = `
   SELECT * FROM "comments" WHERE "recipe_id" = $1;
`;
    pool.query(queryText, [req.params.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error('Error getting recipe comments from DB:', error);
            res.sendStatus(400);
        });
});


// GET all recipes from specific folder
router.get('/folder/:id', rejectUnauthenticated, (req, res) => {
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
       JOIN "recipe_list_recipes" ON "recipe_list_recipes"."recipe_id" = "recipe_item"."id"
       WHERE "recipe_item"."user_id" = $1 AND "recipe_list_recipes"."list_id" = $2
       ${req.query.q ? 'AND "title" ILIKE $3' : ''}
       ORDER BY
           "recipe_list_recipes"."added_at" DESC;
       `;


    const queryParams = [req.user.id, req.params.id];
    if (req.query.q) {
        queryParams.push(`%${req.query.q}%`);
    }
    pool.query(queryText, queryParams)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error('Error getting recipe folder recipes from DB', error);
            res.sendStatus(400);
        })
});


// Remove ingredient from grocery list
router.put('/groceries/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `
   UPDATE "grocery_list" SET "recipe_ingredients" = $1
   WHERE "user_id" = $2 AND "recipe_id" = $3;
   `;
    pool.query(queryText, [req.body.newGroceryItem, req.user.id, req.params.id])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.error('Error deleting ingredient from grocery list:', error);
            res.sendStatus(500);
        });
});


// DELETE selected recipe from the DB
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    // Must first delete comments associated with the recipe
    let firstQueryText = `
DELETE FROM "recipe_list_recipes" WHERE "user_id" = $1 AND "recipe_id" = $2;
`;
    // Must first delete comments associated with the recipe
    let secondQueryText = `
DELETE FROM "comments" WHERE "user_id" = $1 AND "recipe_id" = $2;
`;
    // Must then delete images associated with the recipe
    let thirdQueryText = `
DELETE FROM "images" WHERE "user_id" = $1 AND "recipe_id" = $2;
`;
    let fourthQueryText = `
DELETE FROM "recipe_item" WHERE "user_id" = $1 AND "id" = $2;
`;
    pool.query(firstQueryText, [req.user.id, req.params.id])
        .then(result => {
            // Next, delete recipe comments from DB
            pool.query(secondQueryText, [req.user.id, req.params.id]);
            // Next, delete recipe images from DB
            pool.query(thirdQueryText, [req.user.id, req.params.id]);
            // Next, delete recipe from DB
            pool.query(fourthQueryText, [req.user.id, req.params.id]);
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


// PUT request to update grocery list in the DB
router.put('/groceries', rejectUnauthenticated, (req, res) => {
    let queryTextOne = `
    UPDATE "recipe_item" SET "is_in_grocery_list" = $1
    WHERE "user_id" = $2 AND "id" = $3;
    `
    let queryTextTwo= `
        INSERT INTO "grocery_list" ("user_id", "recipe_id", "recipe_ingredients", "recipe_title")
        VALUES ($1, $2, $3, $4)
        ON CONFLICT ("user_id", "recipe_id") DO UPDATE SET
            "recipe_ingredients" = EXCLUDED.recipe_ingredients,
            "recipe_title" = EXCLUDED.recipe_title,
            "last_edited" = CURRENT_TIMESTAMP;
    `;
    pool.query(queryTextOne, [req.body.isInGroceryList, req.user.id, req.body.id]);
    pool.query(queryTextTwo, [req.user.id, req.body.id, req.body.ingredients, req.body.title])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error updating grocery list in DB:', error);
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
   SELECT * FROM "recipe_list" WHERE "user_id" = $1 ORDER BY "created_at" DESC;
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


// DELETE recipe from recipe list in the DB
router.delete('/list/recipes/:recipeId/:listId', rejectUnauthenticated, (req, res) => {
    let queryText = `
   DELETE FROM "recipe_list_recipes"
   WHERE "user_id" = $1 AND "recipe_id" = $2
   AND "list_id" = $3
   ;
   `;
    pool.query(queryText, [req.user.id, req.params.recipeId, req.params.listId])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.error('Error deleting recipe from recipe list in DB:', error);
            res.sendStatus(500);
        });
});


// GET recipe list photos from the DB
router.get('/list/recipes/photos', rejectUnauthenticated, (req, res) => {
    let queryText = `
   SELECT "recipe_item".*,
           COALESCE(
               (SELECT "images"."path"
               FROM "images"
               WHERE "images"."recipe_id" = "recipe_item"."id"
               ORDER BY "images"."created_at" DESC
               LIMIT 1),
               "recipe_item"."photo"
           ) AS "display_photo",
           array_agg("recipe_list_recipes"."list_id") AS "list_id"
FROM "recipe_item"
JOIN "recipe_list_recipes" ON "recipe_list_recipes"."recipe_id" = "recipe_item"."id"
WHERE "recipe_item"."user_id" = $1
GROUP BY "recipe_item"."id", "recipe_list_recipes"."added_at"
ORDER BY "recipe_list_recipes"."added_at" DESC;`;
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.error('Error getting recipe list photos from DB:', error);
            res.sendStatus(400);
        });
});


// PUT request to update recipe list name in the DB
router.put('/list/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `
   UPDATE "recipe_list" SET "list_name" = $1
   WHERE "user_id" = $2 AND "id" = $3;
   `;
    pool.query(queryText, [req.body.name, req.user.id, req.params.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error('Error updating recipe list name in DB:', error);
            res.sendStatus(500);
        });
});


// DELETE selected recipe list from the DB
router.delete('/delete/list/:id', rejectUnauthenticated, (req, res) => {
    let firstQueryText = `
DELETE FROM "recipe_list_recipes" WHERE "user_id" = $1 AND "list_id" = $2;
`;
    let secondQueryText = `
DELETE FROM "recipe_list" WHERE "user_id" = $1 AND "id" = $2;
`;
    pool.query(firstQueryText, [req.user.id, req.params.id])
        .then(result => {
            pool.query(secondQueryText, [req.user.id, req.params.id]);
            res.sendStatus(201);
        })
        .catch(error => {
            console.error('Error deleting recipe list from DB:', error);
            res.sendStatus(500);
        });
});


// GET recipe list name by ID from the DB
router.get('/list/name/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `
   SELECT "list_name" FROM "recipe_list" WHERE "user_id" = $1 AND "id" = $2;
   `;
    pool.query(queryText, [req.user.id, req.params.id])
        .then(result => {
            res.send(result.rows[0].list_name);
        })
        .catch(error => {
            console.error('Error getting recipe list name by ID from DB:', error);
            res.sendStatus(400);
        });
});


module.exports = router;