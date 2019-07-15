const mdAuth = require('../config/authtoken');
module.exports = (app) => {
    const archivo = require('../controllers/archivo.controller');

    // Crea un nuevo canal
    app.post('/archivos', [mdAuth.verificaToken, mdAuth.verificaAdmin], archivo.create);

    // Devuelve todos los canales
    app.get('/archivos', archivo.findAll);

    // Devuelve un solo canal
    app.get('/archivos/:id', archivo.findOne);

    // Actualiza un canal por Id
    app.put('/archivos/:id', [mdAuth.verificaToken, mdAuth.verificaAdmin], archivo.update);

}