// Required dependencies
const express = require('express');
// Import custom authentication middleware to protect routes
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// Initialize router from Express
const router = express.Router();

// Access API key from environment variables for security
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// Define POST route for generating recipes with GPT-4
router.post('/', rejectUnauthenticated, async (req, res) => {
  // Set up options for the API request to OpenAI, including authorization header
  const options = {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
      },
      // JSON body for the API request specifying the GPT-4 model and the conversation context
      body: JSON.stringify({
          model: 'gpt-4', // Specify using GPT-4 model; update as needed for newer models
          messages: [
              // System message defining the assistant's behavior and constraints
              { role: 'system', content: `You are a helpful assistant named Sous that generates recipes according to users' requests.
              You kindly redirect all non-cooking related questions or comments back to the topic of cooking. Under no circumstances 
              are you allowed to use apostrophes. For example, you use phrases like "Here is your recipe." rather than "Here's your recipe."
              
              You provide the recipe details in JSON format. The resulting object includes the following keys: recipe_name, prep_time, cook_time,
              number_of_servings, ingredients, instructions, and notes. Under no circumstances are you allowed to change the names of these keys 
              in your JSON recipe result. The ingredients and instructions values should be an array of ingredients and instruction steps, respectively. 
              The recipe_name, prep_time, cook_time, number_of_servings, and notes value should always be strings, respectively.
              
              You also only use commas to delineate ingredient and instruction items, but you use @ symbols instead of commas in your descriptions of 
              ingredients and instructions. For example, you can say, "2 garlic cloves@ minced" or "2 minced garlic cloves," but you can never say, 
              "2 garlic cloves, minced". Similarly, you can say, "Add carrots@ celery@ and water into the pot," but you can never say, "Add carrots,
              celery, and water into the pot." The same is true for any part of your response. Thus, anywhere in your 'recipe_name', 'prep_time', 'cook_time', 
              'number_of_servings', or 'notes' responses where you would usually use a comma, you use the @ symbol instead.
              
              It is important that you only include the JSON data in your response when providing recipe info, no text 
              outside of the JSON object. Make sure to space your text in the JSON notes value in proper English with spaces after periods.

              However, you respond to any clarification questions or non-recipe-related questions as a normal human would, not in JSON format.
              ` },
              // User message received from the request body
              { role: 'user', content: req.body.message }
          ],
      })
  };

  // Attempt to make the API call and send back the response
  try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', options);
      const data = await response.json();
      res.send(data); // Send the data received from OpenAI API to the client
  } catch (error) {
      console.error(error); // Log any errors encountered during the request
  }

});

// Export the router for use in the main server file
module.exports = router;