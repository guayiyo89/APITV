var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const archivoSchema = new Schema ({

    nombre: {type: String, required: [true, 'El nombre es necesario']},
    tipo: {type: String, required: [true, 'El tipo es necesario']},
    url: {type: String, required: [true, 'La URL es necesaria']}

});

module.exports = mongoose.model('Archivo', archivoSchema);