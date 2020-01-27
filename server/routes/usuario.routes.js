const express = require("express");
const app = express();
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion')

app.get("/usuario", verificaToken , (req, res) => {

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find({estado: true}, "nombre email estado role google img")
    .skip(desde)
    .limit(limite)
    .exec((err, usuariosDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      Usuario.count({}, (err, conteo) => {
        res.json({
          ok: true,
          usuarios: usuariosDB,
          cantidad: conteo
        });
      });
    });
});

app.post("/usuario", [verificaToken, verificaAdminRole], function(req, res) {
  let body = req.body;
  let { nombre, email, password, role } = body;

  let usuario = new Usuario({
    nombre,
    email,
    password: bcrypt.hashSync(password, 10),
    role
  });

  usuario.save((error, userDB) => {
    if (error) {
      return res.status(400).json({
        ok: false,
        error
      });
    }

    res.json({
      ok: true,
      userDB
    });
  });
});

// PUT
app.put("/usuario/:id", function(req, res) {
  let id = req.params.id;
  let body = _pick(req.body, ["nombre", "email", "img", "role"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        usuario: usuarioDB
      });
    }
  );
});

app.delete("/usuario/:id", function(req, res) {
  let id = req.params.id;
  
  let cambiaEstado = {
      estado: false
  }

  Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true} ,(err, usuarioBorrado ) => {

    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuario: usuarioBorrado
    });
    
  });

});

module.exports = app;
