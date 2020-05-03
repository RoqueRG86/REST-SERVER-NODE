const jwt = require('jsonwebtoken');
//========================
// Vefificacion Token
//========================

//debe leer token desde el header
const verificarToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: { message: 'El usuario no es administrador' }
            });
        } else {
            req.usuario = decoded.usuario;
            next();
        }
    });
};

//==============================
//Validar que se ADMIN_ROLE
//==============================
const validarRoleAdmin = (req, res, next) => {

    let usuario = req.usuario;
    console.log('Rol :', usuario.role);
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.status(400).json({
            ok: false,
            err: { message: 'El usuario no es administrador' }
        });
    }
};

module.exports = {
    verificarToken,
    validarRoleAdmin
};