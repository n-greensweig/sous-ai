const express = require('express');
const router = express.Router();

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

router.post('/', async (req, res) => {

    console.log('hi');
  
      const options = {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              model: 'gpt-4', // potentially upgrade to gpt-4-1106-preview model
              messages: [
                //   { role: 'system', content: `You are a helpful assistant that generates recipes according to users requests.
                //   You kindly redirect all non-cooking related questions or comments back to the topic of cooking. Under no circumstances 
                //   are you allowed to use apostrophes. For example, you use phrases like "Here is your recipe." rather than "Here's your recipe."
                  
                //   Also, you begin every set of recipe instructions with the following format, "Here is a delicious [recipe type] recipe. Ingredients:" and 
                //   then proceed to provide the ingredients and instructions of the recipe. For example, if the user says, "Write me a chicken pot pie recipe," or 
                //   "What's a good chicken pot pie recipe?", you respond with "Here is a delicious chicken pot pie recipe...Ingredients:...Instructions:" and then proceed to give the 
                //   rest of the recipe instructions. You always use this format and always use the words 'Here is a delicious' and 'recipe' in their respective places.

                //   When writing out ingredient lists you always, under all circumstances, delineate each ingredient with hyphens, trailing space and separate each ingredient with a comma. 
                //   Similarly, when writing out recipe instructions you delineate each step in the set of instructions with numbers. An example ingredient list 
                //   looks like this: "- 1 tablespoon of olive oil, - 2 cans of diced tomatoes," and so on. An example instructions list looks like this: "1. Preheat the oven to 425 degrees. 
                //   2. Chop up the yellow onions." and so on.
                //   ` },

                // You also only use commas to delineate ingredient and instruction items, but you never use them in your descriptions of ingredients or instructions. For example,
                //   you say, "2 minced garlic cloves" rather than "2 garlic cloves, minced".
                  { role: 'system', content: `You are a helpful assistant that generates recipes according to users requests.
                  You kindly redirect all non-cooking related questions or comments back to the topic of cooking. Under no circumstances 
                  are you allowed to use apostrophes. For example, you use phrases like "Here is your recipe." rather than "Here's your recipe."
                  
                  You provide the recipe details in JSON format. The resulting object includes the following keys: recipe_name, prep_time, cook_time,
                  number_of_servings, ingredients, instructions, and notes. Under no circumstances are you allowed to change the names of these keys 
                  in your JSON recipe result. The ingredients and instructions values should be an array of ingredients and instruction steps, respectively.
                  
                  You also only use commas to delineate ingredient and instruction items, but you use @ symbols instead of commas in your descriptions of 
                  ingredients and instructions. For example, you can say, "2 garlic cloves@ minced" or "2 minced garlic cloves," but you can never say, 
                  "2 garlic cloves, minced". Similarly, you can say, "Add carrots@ celery@ and water into the pot," but you can never say, "Add carrots,
                  celery, and water into the pot." The same is true for any part of your response. Thus, anywhere in your 'recipe_name', 'prep_time', 'cook_time', 
                  'number_of_servings', or 'notes' responses where you would usually use a comma, you use the @ symbol instead.
                  
                  It is important that you only include the JSON data in your response when providing recipe info, no text 
                  outside of the JSON object. Make sure to space your text in the JSON notes value in proper English with spaces after periods.

                  However, you respond to any clarification questions or non-recipe-related questions as a normal human would, not in JSON format.
                  ` },
                  { role: 'user', content: req.body.message }
              ],
          })
      };
  
      try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', options);
          const data = await response.json();
          res.send(data);
      } catch (error) {
          console.error(error);
      }
  
  });

  module.exports = router;