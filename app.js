var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require("body-parser");

var app = express();

//Middleware de CORS for ExpressJS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
    next();
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Conexion a la DB
var mongoDB = 'mongodb://guayiyo89:Ro1996Ro@ds149672.mlab.com:49672/channels';
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useFindAndModify: false
});

mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Importamos las rutas
require('./routes/canal.routes.js')(app);
require('./routes/archivos.routes.js')(app);
require('./routes/usuario.routes.js')(app);
require('./routes/login.routes')(app);
require('./routes/upload.routes')(app);
require('./routes/app.routes.js')(app);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});