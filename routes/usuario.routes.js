module.exports = (app) => {
    const usuario = require('../controllers/usuario.controller');

    app.get('/usuarios', usuario.findAll);

    app.get('/usuarios/:id', usuario.findOne);

    app.post('/usuarios', usuario.create);

    app.put('/usuarios/:id', usuario.update);
}