module.exports = (app) => {
    const canal = require('../controllers/canal.controller.js');

    // Crea un nuevo canal
    app.post('/canales', canal.create);

    // Devuelve todos los canales
    app.get('/canales', canal.findAll);

    // Devuelve un solo canal
    app.get('/canales/:id', canal.findOne);

    // Actualiza un canal por Id
    app.put('/canales/:id', canal.update);

    // Elimina un canal por Id
    app.delete('/canales/:id', canal.delete);

    // Buscar Canal
    app.get('/canales/buscar/:palabra', canal.search);

    // Canales por zonal
    app.get('/canales/zonal/:zonal', canal.byZonal);
}