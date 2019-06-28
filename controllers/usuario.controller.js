const Usuario = require('../models/usuario');
var bcrypt = require('bcryptjs');

//============================================================
// crear un usuario
//============================================================
exports.create = (req,res) => {
    // Validate request
    if(!req.body.username && !req.body.password) {
        return res.status(400).send({
            message: "Debe tener un username y un password"
        });
    }

    // Create a Note
    const usuario = new Usuario({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password,10),
        email: req.body.email || "tvadmin@telsur.cl",
        userrole: req.body.userrole || "USER_ROLE"
    });

    // Save Note in the database
    usuario.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

//============================================================
// MOSTRAR TODOS LOS USUARIOS
//============================================================
exports.findAll = (req,res) => {
    Usuario.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

//============================================================
// MOSTRAR UN USUARIO (ID)
//============================================================
exports.findOne = (req,res) => {

    Usuario.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        email: req.body.email || "tvadmin@telsur.cl",
        userrole: req.body.userrole || "USER_ROLE"
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "No se ha encontrado el registro de id: " + req.params.id
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No se ha encontrado el registro de id: " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });
};

//============================================================
// ACTUALIZAR UN USUARIO
//============================================================
exports.update = (req,res) => {
    if(!req.body.username && !req.body.password) {
        return res.status(400).send({
            message: "Debe tener un username y un password"
        });
    }
    
    Usuario.findByIdAndUpdate(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "No hay canal con tal ID: " + req.params.id
            });
        }
        res.send({message: "Canal eliminado satisfactoriamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "No hay canal con tal ID: " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error al eliminar el registro ID: " + req.params.id
        });
    });
};