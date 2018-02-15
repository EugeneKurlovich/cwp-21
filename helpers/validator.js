const Joi = require('joi');

module.exports = (schemaObject, data) => {
    if (!schemaObject) return false;

    let errors = '';
    let isValid = true;
    let schema = Joi.object().keys(schemaObject);

    let validationResult = Joi.validate(data, schema);

    if (validationResult.error) {
       console.log("ERROR VALIDATION");
    }
    else
    {
        return true;
    }
};