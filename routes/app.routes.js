module.exports = (app) => {
    app.get('/', (req, res, next) => {
        res.status(200).json({
            ok: true,
            mensaje: 'La peticion esta OK'
        });
    
    });
}