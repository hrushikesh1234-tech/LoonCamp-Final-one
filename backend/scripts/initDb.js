const fs = require('fs');
const path = require('path');
const { pool } = require('../db');

async function initializeDatabase() {
  try {
    console.log('Initializing database...');

    // Read schema file
    const schemaPath = path.join(__dirname, '../schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute schema
    await pool.query(schema);

    console.log('Database initialized successfully!');
    console.log('\nDefault admin credentials:');
    console.log('Email: admin@looncamp.com');
    console.log('Password: admin123');
    console.log('\nPlease change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();
