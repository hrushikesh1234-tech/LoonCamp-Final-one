const bcrypt = require('bcrypt');

async function generateHash() {
  try {
    const password = 'LoonCamp@2026';
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    console.log('\n=================================');
    console.log('Password Hash Generator');
    console.log('=================================');
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}`);
    console.log('=================================\n');
    console.log('Use this hash in schema.sql or database');

  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

generateHash();
