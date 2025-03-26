// src/openaiAgent.js
require('dotenv').config();
const { OpenAI } = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_APIKEY
});

async function queryOpenAI(instructions,prompt) {
    try {
        console.log("userPrompt: ", prompt);
        const completion = await openai.responses.create({
            model: 'gpt-4',
            instructions: instructions,
            input:  prompt
        });
        console.log("****completion: ", completion);
       
        return completion.output_text.trim();
    } catch (error) {
        console.log("openai error: ", error);
        throw error;
    }
}


module.exports = { openai, queryOpenAI };