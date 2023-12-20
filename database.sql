
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
	"photo" VARCHAR(1000),
	"instructions" VARCHAR(100000),
	"rating" INTEGER,
	"is_cooked" BOOLEAN DEFAULT FALSE
);

-- Sample recipe data
---- Recipe instructions must either avoid including apostrophes 
---- or escape apostrophes in the POST request
INSERT INTO "recipe_item" ("user_id", "title", "photo", "instructions", "rating", "is_cooked")
VALUES (
1, 'Tomato Soup', 'tomato-soup.png', 'Ingredients:

2 tablespoons olive oil
1 medium onion, chopped
2 cloves garlic, minced
1 can (28 ounces) crushed tomatoes
1 can (14 ounces) diced tomatoes
4 cups vegetable broth or chicken broth (for a non-vegetarian option)
1 teaspoon sugar
1 teaspoon dried basil
1 teaspoon dried oregano
1/2 teaspoon salt (adjust to taste)
1/4 teaspoon black pepper (adjust to taste)
1/2 cup heavy cream (optional, for a creamier soup)
Fresh basil leaves or parsley for garnish (optional)
Grated Parmesan cheese for garnish (optional)
Croutons or bread for serving (optional)
Instructions:

Heat the olive oil in a large pot over medium heat. Add the chopped onion and sauté for about 3-5 minutes, or until it becomes translucent and starts to soften.

Add the minced garlic to the pot and sauté for another 1-2 minutes until fragrant, being careful not to let it brown.

Pour in the crushed tomatoes and diced tomatoes (with their juices) into the pot. Stir to combine.

Add the vegetable or chicken broth to the pot and stir well. Bring the mixture to a boil.

Once the soup is boiling, reduce the heat to low and simmer for about 15-20 minutes to allow the flavors to meld together. Stir occasionally.

Season the soup with sugar, dried basil, dried oregano, salt, and pepper. Adjust the seasoning to taste, adding more salt and pepper if necessary.

If you want a creamy tomato soup, stir in the heavy cream at this stage. Simmer for an additional 5 minutes, stirring occasionally, until the soup is heated through.

Remove the pot from heat and let it cool slightly.

Use an immersion blender or a regular blender (in batches) to puree the soup until smooth. Be cautious when blending hot liquids and allow some heat to escape if using a regular blender.

Return the pureed soup to the pot and heat it over low heat if needed.

Serve the tomato soup hot, garnished with fresh basil leaves or parsley, a sprinkle of grated Parmesan cheese, and croutons or a slice of bread on the side, if desired.

Enjoy your delicious homemade tomato soup!', 4, FALSE
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
VALUES (1, 1, 'This tomato soup recipe is great!');