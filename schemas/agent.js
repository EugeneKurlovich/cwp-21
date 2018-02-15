const Joi = require('joi');

module.exports = {
    
    name: Joi.string().min(1),
    email: Joi.string().email().min(5),
    tel: Joi.string().min(1)
};