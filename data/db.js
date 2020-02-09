import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const ClientesSchema = new Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    emails: Array,
    edad: Number,
    tipo: String,
    pedidos: Array
})

const ProductosSchema = new Schema({
    nombre: String,
    precio: Number,
    stock: Number
})

const UsuariosSchema = new Schema({
    usuario: String,
    password: String
})

UsuariosSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  })
  
export const Clientes = mongoose.model('Cliente', ClientesSchema)
export const Productos = mongoose.model('Productos', ProductosSchema)
export const Usuarios = mongoose.model('Usuario', UsuariosSchema)