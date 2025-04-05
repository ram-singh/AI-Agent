const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const { createTable, insertData } = require('./createDB');
const { parseCSV } = require('./csvParser');
const { suggestOptimizedSchema } = require('./schemaSuggestion');
const { fetchSchema } = require('./fetchDBSchema');
const axios = require("axios");

const app = express();

// Initialize database and load CSV data
(async () => {
    createTable();

    const data = await parseCSV('./data/retail.csv');
    insertData(data);

    console.log('Database initialized with Retail.csv.');
})();

app.use(bodyParser.json());
console.log("dirname: ", __dirname);
app.use(express.static(path.join(__dirname, '../public')));

app.post('/suggestedSchema', async (req, res) => {
    // const userPrompt = req.body.prompt;
    try {
        const schemaSuggestions = await suggestOptimizedSchema();
        res.json({ sql: "Schema Suggestions: ", response: schemaSuggestions });
    } catch (error) {
        res.status(500).send(error.message);
    }

});

app.get('/fetchSchema', async (req, res) => {
    try {
        const schema = await fetchSchema();
        res.json({ response: schema });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

function checkAPIKey() {
    const apiKey = process.env.OPENAI_APIKEY;
    console.log("checkAPIKey ........");
    axios.get("https://api.openai.com/v1/models", {
        headers: { "Authorization": `Bearer ${apiKey}` }
    }).then(response => {
        console.log("API key is valid.");
    }).catch(error => {
        console.log("Invalid API key:", error.response.data);
    });
}
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // setTimeout(()=>{checkAPIKey()},5000);
});