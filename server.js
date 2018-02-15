const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errors = require('./helpers/errors');
const {propertySchema, agentSchema, officeSchema} = require('./schemas');

const PropertyService = require('./services/property');
const AgentService = require('./services/agent');
const OfficeService = require('./services/office');


module.exports = (db, config) => {
    const app = express();

   // Services
   const propertyService = new PropertyService(db.properties, db.agents, propertySchema, errors);
   const agentService = new AgentService(db.agents, db.offices, agentSchema, errors);
   const officeService = new OfficeService(db.offices, officeSchema, errors);

   // Controllers
   const apiController = require('./controllers/api')(
       propertyService,
       agentService,
       officeService,
       config
   );

   //Mounting
   app.use(bodyParser.json());
   app.use('/api', apiController);

    return app;
};