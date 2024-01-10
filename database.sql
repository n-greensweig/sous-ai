
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


-- Table storing saved recipes
CREATE TABLE "recipe_item" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user",
	"title" VARCHAR(256),
	"prep_time" VARCHAR(256),
	"cook_time" VARCHAR(256),
	"number_of_servings" VARCHAR(256),
	"photo" VARCHAR(1000) DEFAULT 'generic-food.png',
	"ingredients" VARCHAR(100000),
	"instructions" VARCHAR(100000),
	"notes" VARCHAR(10000),
	"rating" INTEGER,
	"is_cooked" BOOLEAN DEFAULT FALSE
);

-- Sample recipe data
---- Recipe instructions must either avoid including apostrophes 
---- or escape apostrophes in the POST request
INSERT INTO "recipe_item" ("user_id", "title", "prep_time", "cook_time", "number_of_servings", "photo", "ingredients", "instructions", "notes", "rating", "is_cooked")
VALUES (
1, 'Pumpkin Pie', '15 minutes', '55 minutes', '8', 'generic-food.png', 
'{"1 can (15 oz) pumpkin","1 can (14 oz) sweetened condensed milk",
"2 large eggs","1 teaspoon ground cinnamon","1/2 teaspoon ground ginger",
"1/2 teaspoon ground nutmeg","1/2 teaspoon salt","1 unbaked pie crust"}',

'{"Preheat your oven to 425°F.","Whisk pumpkin, sweetened condensed milk, eggs, 
spices and salt in medium bowl until smooth.","Pour into crust.","Bake 15 minutes.",
"Reduce oven temperature to 350°F and continue baking 35 to 40 minutes or until knife 
inserted 1 inch from crust comes out clean.","Cool.","Garnish as desired."}', 

'Store leftovers covered in refrigerator. The pie is usually better when it has cooled down, as the consistency is firmer. 
If you like, you can prepare this pie one day in advance.', 

4, FALSE
);


-- Table storing user comments
CREATE TABLE "comments" (
    "id" SERIAL PRIMARY KEY,
    "recipe_id" INTEGER REFERENCES "recipe_item",
    "user_id" INTEGER REFERENCES "user",
    "comment" TEXT,
    "commented_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample comment data
INSERT INTO "comments" ("recipe_id", "user_id", "comment")
VALUES (1, 1, 'This pumpkin pie recipe is great!');