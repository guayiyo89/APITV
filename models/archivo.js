var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const archivoSchema = new Schema ({

    nombre: {type: String, required: [true, 'El nombre es necesario']},
    contentType: {type: String, required: [true, 'El tipo es necesario']},
    image: {type: String, required: [true, 'El nombre es necesario']}

});

module.exports = mongoose.model('Archivo', archivoSchema);