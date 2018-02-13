const Sequelize = require('sequelize');
const config = require('./config.json');

const db = require('./context')(Sequelize, config);
const server = require('./server')(db, config);
const insertData = require('./helpers/insertData');

(async function () {
    await db.sequelize.sync({force: true});
    await insertData(db);

    server.listen(config.app.port, () => console.log('Running'));
})();