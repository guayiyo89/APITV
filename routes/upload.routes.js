const multer = require('multer');

const DIR = './uploads';

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        console.log(file);
        var filetype = '';
        if(file.mimetype === 'image/png'){
            filetype = 'png';
        }
        if(file.mimetype === 'image/jpeg'){
            filetype = 'jpg';
        }
        if(file.mimetype === 'image/gif'){
            filetype = 'gif';
        }
        if(file.mimetype === 'application/vnd.visio'){
            filetype = 'vsd';
        }
        if(file.mimetype === 'application/octec-stream'){
            filetype = 'vsdx';
        }
        cb(null, file.fieldname + '-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});

module.exports = (app) => {
    const archivo = require('../controllers/upload.controller');

    app.get('/imagenes', archivo.getImages);

    app.get('/visios', archivo.getVisios);

    app.post('/upload', upload.single('image'), archivo.uploadFile );
}