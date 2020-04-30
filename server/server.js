require('./config/config');
const express = require('express');
const mongoose = require('mongoose'); //paqueteria de mongoDB conexion BD
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//para obtener las rutas de usuario.js endpoints
app.use(require('./routes/usuario'));

//conexion a la base de datos
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {

    if (err) throw err;
    console.log("Base de datos ONLINE");
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto : ', process.env.PORT);
});