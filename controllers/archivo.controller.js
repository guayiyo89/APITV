
const Archivo = require('../models/archivo');

//=======================================================
// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nombre) {
        return res.status(400).send({
            message: "Debe asignar un nombre al Archivo."
        });
    }

    // Create a Note
    const archivo = new Archivo({
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        url: req.body.url,
    });

    // Save Note in the database
    archivo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

//=======================================================
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Archivo.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

//=======================================================
// Find a single note with a noteId
exports.findOne = (req, res) => {
    Archivo.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "No existe registro con este id: " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No existe registro con este id: " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error al recibir el registro, ID: " + req.params.id
        });
    });
};

//=======================================================
// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.nombre) {
        return res.status(400).send({
            message: "Debe asignar un nombre al archivo."
        });
    }

    // Find note and update it with the request body
    Archivo.findByIdAndUpdate(req.params.id, {
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        url: req.body.url,
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

// =======================================================
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Archivo.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "No hay archivo con tal ID: " + req.params.id
            });
        }
        res.send({message: "archivo eliminado satisfactoriamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "No hay archivo con tal ID: " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error al eliminar el registro ID: " + req.params.id
        });
    });
};
