const express = require('express');
const app = express();
const Usuario = require('../models/usuario.model');

app.get('/usuario', function (req, res) {
    res.json('get usuario');
});

app.post('/usuario', function (req, res) {
    let body = req.body;
    let { nombre, email, password, role } = body;

    let usuario = new Usuario({
        nombre,
        email,
        password,
        role
    });

    usuario.save((error, userDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            })
        }

        res.json({
            ok: true,
            userDB
        });

    });
});

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    res.json({ id });
});
app.delete('/usuario', function (req, res) {
    res.json('delete usuario');
});

module.exports = app;