-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


-- Table of recipes
CREATE TABLE "recipe_item" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user",
	"title" VARCHAR(256),
	"prep_time" VARCHAR(256),
	"cook_time" VARCHAR(256),
	"number_of_servings" VARCHAR(256),
	"photo" VARCHAR(1000) DEFAULT 'generic-plate.png',
	"ingredients" VARCHAR(100000),
	"instructions" VARCHAR(100000),
	"notes" VARCHAR(10000),
	"rating" INTEGER,
	"is_cooked" BOOLEAN DEFAULT FALSE,
	"created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipe sample data
---- Recipe instructions must either avoid including apostrophes 
---- or escape apostrophes in the POST request
INSERT INTO "recipe_item" ("user_id", "title", "prep_time", "cook_time", "number_of_servings", "photo", "ingredients", "instructions", "notes", "rating", "is_cooked")
VALUES (
1, 'Classic Tomato Soup', '10 minutes', '30 minutes', '4', 'soup.png', '1 tablespoon of olive oil
1 onion, chopped
2 cloves of garlic, minced
2 cans of diced tomatoes (14.5 ounces each)
1/2 cup of vegetable broth
1/2 teaspoon of salt
1/4 teaspoon of black pepper
1/4 teaspoon of sugar
1 cup of heavy cream',

'In a large pot, heat the olive oil over medium heat.
Add the chopped onion and minced garlic to the pot and cook until the onions are translucent and the garlic is fragrant.
Add the diced tomatoes, vegetable broth, salt, pepper, and sugar to the pot. Stir to combine and bring the mixture to a boil.
Reduce the heat to low and let the soup simmer for 20 minutes.
Use an immersion blender or regular blender to puree the soup until smooth. If using a regular blender, be sure to do this in batches and be careful with the hot soup.
Stir in the heavy cream and cook the soup for another 5 minutes, or until it is heated through.
Serve the soup hot with your favorite bread or crackers.', 

'You may substitute chicken broth for vegetable broth if you wish. If you prefer a lighter soup, you may also substitute the heavy cream with milk or half and half.', 
4, FALSE
);

-- Comments table
CREATE TABLE "comments" (
    "id" SERIAL PRIMARY KEY,
    "recipe_id" INTEGER REFERENCES "recipe_item",
    "user_id" INTEGER REFERENCES "user",
    "comment" TEXT,
    "commented_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments sample data
INSERT INTO "comments" ("recipe_id", "user_id", "comment")
VALUES (1, 1, 'This tomato soup recipe is great!');

-- Images table
CREATE TABLE "images" (
	"id" SERIAL PRIMARY KEY,
    "recipe_id" INTEGER REFERENCES "recipe_item",
    "user_id" INTEGER REFERENCES "user",
    "path" VARCHAR(2048) DEFAULT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Images sample data
INSERT INTO "images" (
"recipe_id", "user_id", "path")
VALUES (1,1,'images/tomato-soup.png');
    
CREATE TABLE "recipe_list" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER NOT NULL,
	"list_name" VARCHAR(256) NOT NULL
);

INSERT INTO "recipe_list" ("user_id", "list_name")
VALUES (1, 'Beef');

CREATE TABLE "recipe_list_recipes" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER,
	"list_id" INTEGER NOT NULL REFERENCES "recipe_list",
	"recipe_id" INTEGER NOT NULL REFERENCES "recipe_item",
	UNIQUE ("list_id", "recipe_id")
);

INSERT INTO "recipe_list_recipes" ("user_id", "list_id", "recipe_id")
VALUES (1, 1, 11);

ALTER TABLE "recipe_item"
ADD COLUMN "last_viewed" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


ALTER TABLE "recipe_list"
ADD COLUMN "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "recipe_list_recipes"
ADD COLUMN "added_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "recipe_item"
ADD COLUMN "is_in_grocery_list" BOOLEAN DEFAULT FALSE;

CREATE TABLE "grocery_list" (
"id" SERIAL PRIMARY KEY,
"user_id" INTEGER,
"recipe_id" INTEGER NOT NULL REFERENCES "recipe_item" ("id"),
"recipe_title" VARCHAR(256),
"recipe_ingredients" VARCHAR(100000) NOT NULL,
"viewable" BOOLEAN DEFAULT FALSE,
"last_edited" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UNIQUE ("recipe_id", "recipe_ingredients")
);

CREATE TABLE "recipe_preferences" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER UNIQUE,
    "preferences" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "household_items" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "last_edited" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE grocery_list
ADD CONSTRAINT unique_user_recipe UNIQUE (user_id, recipe_id);

ALTER TABLE recipe_preferences
ADD COLUMN "user_ingredients" TEXT[] DEFAULT ARRAY[]::TEXT[];

--Anything below this line needs to be added to Heroku as of 8/8/2024
CREATE TABLE "threads" (
"id" SERIAL PRIMARY KEY,
"user_id" INTEGER,
"conversation" TEXT[] DEFAULT ARRAY[]::TEXT[],
"updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);