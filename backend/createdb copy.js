const sqlite3 = require('sqlite3').verbose();

// Create a new database (if it doesn't exist) or open an existing one
const db = new sqlite3.Database('./coworking_registry.db');

// Run the SQL query to create the 'users' table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT coworker
  )
`, (err) => {
  if (err) {
    console.error('Error creating the users table:', err.message);
  } else {
    console.log('Users table created (or already exists)');
  }
});
db.run(`
  CREATE TABLE IF NOT EXISTS workspace (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    availability BOOL NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`, (err) => {
  if (err) {
    console.error('Error creating the workspace table:', err.message);
  } else {
    console.log('Workspace table created (or already exists)');
  }
});
db.run(`
  CREATE TABLE IF NOT EXISTS property (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    address TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    squarefoot TEXT NOT NULL,
    parking BOOL NOT NULL,
    transportation BOOL NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`, (err) => {
  if (err) {
    console.error('Error creating the workspace table:', err.message);
  } else {
    console.log('Property table created (or already exists)');
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