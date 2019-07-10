var jwt = require('jsonwebtoken');
module.exports = (app) => {
    const login = require('../controllers/login.controller');

    app.post('/login', login.login);
    
}