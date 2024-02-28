const db = require('../config/connection');

module.exports = async (collectionName) => {
  try {
    // drop specified collection
    await db.dropCollection(collectionName);
    console.log(`Collection '${collectionName}' dropped successfully!`);
  } catch (err) {
    console.error('Error dropping collection:', err);
    throw err;
  }
};