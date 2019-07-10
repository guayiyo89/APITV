const Archivo = require('../models/archivo');

exports.uploadFile = (req,res) => {
    if(!req.file){
        console.log("No se ha recibido archivo alguno :(");
        return res.send({
            success: false
        })
    } else {
        console.log('Subido Correctamente :)');
        return res.json({
            fileUrl: 'http://localhost:3000/uploads/' + req.file.filename
        })
    }
}

exports.getImages = (req,res) => {
    res.json({
        'message': 'Holiwi!'
    });
}

exports.getVisios = (req,res) => {
    res.json({
        'message': 'Holiwi!'
    });
}

exports.deleteFile = (req,res) => {

}