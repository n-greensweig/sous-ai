const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, });

router.post('/api/openai', async (req, res) => {
    const { userInput } = req.body;
    try {
        const chatResponse = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    'role': 'system',
                    'content': `You are a helpful assistant that provides recipes according to users' requests. 
                    You politely direct all non-recipe related requests back to the topic of recipes. Under no circumstances 
                    may you use an apostrophe in your response.`,
                },
                {
                    'role': 'user',
                    'content': userInput,
                }
            ],
            stream: true,
        });
        res.send(chatResponse.data);
    } catch (error) {
        console.error('Error getting response from OpenAI:', error);
        res.sendStatus(500);
    }
})