var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const canalSchema = new Schema ({

    nombre: {type: String, required: [true, 'El nombre es necesario']},
    ciudad: {type: String, required: false},
    zonal: {type: String, required: [true, 'Asigne una zonal']},
    archivos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Archivo'}],
    urlEncoder: {type: String, required: false},

},{collection: 'canales'});

module.exports = mongoose.model('Canal', canalSchema);