const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: 'Error, {VALUE} no es un rol valido'
};
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'El password es necesario']
    },
    img: {
        type: String,
        //required: [true, 'La imagen es necesaria']
    },
    role: {
        type: String,
        default: 'USER_ROL',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true,
        // required: [true, 'El estado es necesario']
    },
    google: {
        type: Boolean,
        default: false,
        //required: [true, 'El estado de google es necesario']
    }

});

//esta funcion modifica la estructura del modelo, esta es una forma de agregar metodos 
//al hacer modificaciones a los prototipos de los objetos en JS 
usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: 'Error, {PATH} debe ser unico' });
module.exports = mongoose.model('Usuario', usuarioSchema);