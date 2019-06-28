var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const canalSchema = new Schema ({

    nombre: {type: String, required: [true, 'El nombre es necesario']},
    ciudad: {type: String, required: false},
    zonal: {type: String, required: [true, 'Asigne una zonal']},
    urlPng: {type: String, required: false},
    urlVisio: {type: String, required: false},
    urlEncoder: {type: String, required: false},

},{collection: 'canales'});

module.exports = mongoose.model('Canal', canalSchema);