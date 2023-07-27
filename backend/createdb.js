const sqlite3 = require('sqlite3').verbose();

// Create a new database (if it doesn't exist) or open an existing one
const db = new sqlite3.Database('./your_sqlite_db_file.db');

// Run the SQL query to create the 'users' table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile TEXT NOT NULL,
    password TEXT NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating the users table:', err.message);
  } else {
    console.log('Users table created (or already exists)');
  }
});

// Close the database connection after creating the table
db.close((err) => {
  if (err) {
    console.error('Error closing the database:', err.message);
  } else {
    console.log('Database connection closed');
  }
});
