const Canal = require('../models/canal');

//=======================================================
// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nombre) {
        return res.status(400).send({
            message: "Debe asignar un nombre al canal."
        });
    }

    // Create a Note
    const canal = new Canal({
        nombre: req.body.nombre,
        ciudad: req.body.ciudad,
        zonal: req.body.zonal || "N/A",
        urlPng: req.urlPng,
        urlVisio: req.body.urlVisio,
        urlEncoder: req.body.urlEncoder
    });

    // Save Note in the database
    canal.save()
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
    Canal.find()
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
    Canal.findById(req.params.id)
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
            message: "Debe asignar un nombre al canal."
        });
    }

    // Find note and update it with the request body
    Canal.findByIdAndUpdate(req.params.id, {
        nombre: req.body.nombre,
        ciudad: req.body.ciudad,
        zonal: req.body.zonal || "N/A",
        urlPng: req.urlPng,
        urlVisio: req.body.urlVisio,
        urlEncoder: req.body.urlEncoder
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
    Canal.findByIdAndRemove(req.params.id)
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

// =============================================================
// Buscar Canales
exports.search = (req, res) => {
    // Recupero la palabra
    var word = req.params.palabra;
    // La transformo en una expresion regular. No Case-Sensitive
    var regex = RegExp(word,'i');
    Canal.find({nombre: regex})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "No existe registro con este id: " + req.params.palabra
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No existe registro con este id: " + req.params.palabra
            });                
        }
        return res.status(500).send({
            message: "Error al recibir el registro, ID: " + req.params.palabra
        });
    });
};

// ==========================================================
// Canales por zonal
exports.byZonal = (req, res) => {
    var zona = req.params.zonal;
    Canal.find({zonal: zona})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "No existe registro con este id: " + req.params.palabra
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No existe registro con este id: " + req.params.palabra
            });                
        }
        return res.status(500).send({
            message: "Error al recibir el registro, ID: " + req.params.palabra
        });
    });
};