require('dotenv').config();
const { queryDatabase } = require('./dbAgent');
const { queryOpenAI } = require('./openaiAgent');


async function suggestOptimizedSchema() {
    const tables = await queryDatabase(sqlQuery="SELECT name FROM sqlite_master WHERE type='table'");
    let schema = "";
    for (const table of tables) {
        if(table.name != "sqlite_sequence") {
            const tableSchema = await queryDatabase(`PRAGMA table_info(${table.name})`);
            schema += `Table: ${table.name}\nColumns: ${JSON.stringify(tableSchema)}\n\n`;
        }
    }

    
    const instructions = "Analyze the following SQLite schema and suggest improvement in schema for better efficiency, provide the html renderable response.";
    const suggestions = queryOpenAI(instructions,schema);
    
    console.log("Optimized Schema Suggestions:", suggestions);
    
    return suggestions;
}

module.exports = { suggestOptimizedSchema };

