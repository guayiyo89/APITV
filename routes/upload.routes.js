let fileUpload = require('express-fileupload');

var jwt = require('jsonwebtoken');
const mdAuth = require('../config/authtoken');


module.exports = (app) => {
    const upload = require('../controllers/upload.controller');
    app.use(fileUpload());

    app.post('/upload/:tipo',[mdAuth.verificaToken, mdAuth.verificaAdmin], upload.uploadFile );  // tipo: VIsio o Imagen 

    app.get('/upload/:tipo/:archivo',[mdAuth.verificaToken], upload.getFile );

   // app.post('/upload', upload.single('image'), archivo.uploadFile );
}