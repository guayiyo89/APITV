var jwt = require('jsonwebtoken');
const mdAuth = require('../config/authtoken');
module.exports = (app) => {
    const canal = require('../controllers/canal.controller.js');

    // Crea un nuevo canal
    app.post('/canales', [mdAuth.verificaToken, mdAuth.verificaAdmin], canal.create);

    // Devuelve todos los canales
    app.get('/canales', canal.findAll);

    // Devuelve un solo canal
    app.get('/canales/:id', canal.findOne);

    // Actualiza un canal por Id
    app.put('/canales/:id', [mdAuth.verificaToken, mdAuth.verificaAdmin], canal.update);

    // Elimina un canal por Id
    app.delete('/canales/:id', [mdAuth.verificaToken, mdAuth.verificaAdmin], canal.delete);

    // Buscar Canal
    app.get('/canales/buscar/:palabra', canal.search);

    // Canales por zonal
    app.get('/canales/zonal/:zonal', canal.byZonal);
}