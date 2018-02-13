const offices = require('../data/offices.json');
const property = require('../data/properties.json');
const agents = require('../data/agents.json');

module.exports = async (db) => {
    await db.offices.bulkCreate(offices);
    await db.agents.bulkCreate(agents);
    await db.properties.bulkCreate(property);
};