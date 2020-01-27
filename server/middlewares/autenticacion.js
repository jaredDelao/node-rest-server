const jwt = require('jsonwebtoken');

// =====
// Verificar token
// =====

let verificaToken = (req, res, next) => {

    // Con get accedemos a los headers 
    let token = req.get('token');

    // callback decoded es el payload
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

    console.log(token);



};


// =====
// Verificar Admin role
// =====
 let verificaAdminRole = (req, res, next ) => {

    let usuario = req.usuario;

    if (usuario.role == 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }

 }


module.exports = {
    verificaToken,
    verificaAdminRole
};