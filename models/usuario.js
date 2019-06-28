var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol valido.'
};

const usuarioSchema = new Schema ({

    username: {type: String, required: [true, 'Es obligatorio']},
    password: {type: String, required: [true, 'Es obligatorio']},
    email: {type: String, required: true},
    userrole: {type: String, required: true, enum: rolesValidos}
})

module.exports = mongoose.model('Usuario', usuarioSchema);