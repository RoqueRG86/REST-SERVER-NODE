const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

app.get('/usuario', function(req, res) {

    //Se obtiene inicia un parametro o sino es 0
    let inicia = req.query.inicia || 0;
    inicia = Number(inicia);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    //Query modelo y aplica restricciones campos
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(inicia) //Saltar e inciar al index 5
        .limit(limite) //Limite de la consulta
        .exec((err, usuariosDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                usuariosDB
            });
            //Utilizar count y aplicacion de condiccion en estatus
            //Usuario.count({ estado: true }
            Usuario.count({ estado: true }, (err, totalReg) => {

                res.status(200).json({
                    ok: true,
                    usuariosDB,
                    totalReg
                });
            });

        });

});

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    //let body = req.body; todo el objeto body...primera opcion
    // Utilizando underscore para validar aquello campos que se se va apoder actualizar 
    //es decir filtra el body

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    //delete body.password; podria utlizarse para quitar objetos pero es ineficiente

    //Actualizar Registro findById
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        });
    });


});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    let cambioEstado = { estado: false };
    //Remueve metedo fisicamente
    // Usuario.findByIdAndRemove(id, (err, usuarioDB) => {



    Usuario.findByIdAndUpdate(id, cambioEstado, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

module.exports = app;