const sqlite3 = require('sqlite3').verbose();

// Create a new database (if it doesn't exist) or open an existing one
const db = new sqlite3.Database('./coworking_registry.db');

// Run the SQL query to create the 'users' table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    email TEXT NOT NULL,
    email_verification BOOL default false,
    username TEXT NOT NULL,
    mobile TEXT,
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
//  workspace
db.run(`
  CREATE TABLE IF NOT EXISTS workspace (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    capacity TEXT,
    photos TEXT,
    availability BOOL NOT NULL default true,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    user_id INTEGER,
    property_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(property_id) REFERENCES property(id)
  )
`, (err) => {
  if (err) {
    console.error('Error creating the workspace table:', err.message);
  } else {
    console.log('Workspace table created (or already exists)');
  }
});
//  property
db.run(`
  CREATE TABLE IF NOT EXISTS property (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    address TEXT,
    neighborhood TEXT,
    squarefoot TEXT,
    parking BOOL default true,
    transportation BOOL default true,
    smoking BOOL default true,
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
//  lease
db.run(`
  CREATE TABLE IF NOT EXISTS lease (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lease_term TEXT,
    price DECIMAL(10,2) default 0.00,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    user_id INTEGER,
    property_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(property_id) REFERENCES property(id)
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