const sqlite3 = require('sqlite3').verbose();

// Open database connection
const db = new sqlite3.Database('./retail.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        createTable(); // Ensure the table exists on startup
    }
});

// Create table if it doesn't exist
function createTable() {
    db.run(`CREATE TABLE IF NOT EXISTS retail (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productName TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table "retail" is ready.');
        }
    });
}

// Insert data into the table
function insertData(data) {
    const stmt = db.prepare(`INSERT INTO retail (productName, category, price, quantity) VALUES (?, ?, ?, ?)`);
    
    data.forEach(row => {
        stmt.run(row.productName, row.category, row.price, row.quantity, (err) => {
            if (err) {
                console.error('Error inserting data:', err.message);
            }
        });
    });

    stmt.finalize((err) => {
        if (err) {
            console.error('Error finalizing statement:', err.message);
        } else {
            console.log('Data inserted successfully.');
        }
    });
}

// Close the database connection when done
process.on('exit', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
});

module.exports = {db, createTable, insertData};