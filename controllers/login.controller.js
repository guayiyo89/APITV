const Usuario = require('../models/usuario');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//Importamos el SEED para el token
var SEED = require('../config/auth').SEED;

exports.login = (req, res) => {
    var body = req.body;
    Usuario.findOne({username: body.username}, (err, usuarioDB) => {
        if (err){
            return res.status(500).json({
                ok:false,
                message: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB){
            return res.status(400).json({
                ok:false,
                message: 'No coinciden las credenciales - email',
                errors: err
            });
        }

        //Comparamos si la contrasena es correcta con la almacenada
        if (!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok:false,
                message: 'No coinciden las credenciales - passwd',
                errors: err
            });
        }

        //TOKEN
        usuarioDB.password = ':)'; //para no enviar el psswd en el token
        var token = jwt.sign({usuario: usuarioDB}, SEED,{ expiresIn: 14400}); //4hrs

        res.status(200).json({
            ok:true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id,
            menu: obtenerMenu(usuarioDB.userrole)
        });

    })

    function obtenerMenu(ROLE) {
        var menu = [
            {titulo: 'Home', url: '/canales', icono: ''},
            {titulo: 'Busqueda', url: '/busqueda', icono: ''}
            ];
        
        if(ROLE === 'ADMIN_ROLE') {
            // menu[1].submenu.unshift({titulo:'Usuarios', url:'/usuarios'});
            menu.unshift([
                {titulo: 'Admin', url: '/admin', icono: ''},
                {titulo: 'AdminUser', url: '/usuarios', icono: ''}
            ])
        };
        return menu;
    }

}