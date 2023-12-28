const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cors = require('cors');
require('dotenv').config();

// import OpenAI from "openai";

// const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, });

// router.post('/api/openai', async (req, res) => {
//     const { userInput } = req.body;
//     try {
//         const chatResponse = await openai.chat.completions.create({
//             model: 'gpt-4',
//             messages: [
//                 {
//                     'role': 'system',
//                     'content': `You are a helpful assistant that provides recipes according to users' requests. 
//                     You politely direct all non-recipe related requests back to the topic of recipes. Under no circumstances 
//                     may you use an apostrophe in your response.`,
//                 },
//                 {
//                     'role': 'user',
//                     'content': userInput,
//                 }
//             ],
//             stream: true,
//         });
//         res.send(chatResponse.data);
//     } catch (error) {
//         console.error('Error getting response from OpenAI:', error);
//         res.sendStatus(500);
//     }
// });

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
            model: 'gpt-4', // potentially change model
            messages: [
                { role: 'system', content: `You are a helpful assistant that generates recipes according to users requests.
                You kindly redirect all non-cooking related questions or comments back to the topic of cooking. Under no circumstances 
                are you allowed to use apostrophes. For example, you use phrases like "Here is your recipe." rather than "Here's your recipe."` },
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