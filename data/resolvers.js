import { Clientes, Productos, Usuarios } from './db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const TOKEN_SECRET = "secret321"

export const resolvers = {
    Query: {
        getCliente: (root, {id})=>{
            return new Promise ((resolve, rejects)=>{
                Clientes.findById(id, (err, cliente)=>{
                    if(err) rejects(err)
                    else resolve(cliente)
                })
            })
        },
        getClientes: (root, {limite, offset})=>{
            return Clientes.find({}).limit(limite).skip(offset)
        },
        totalClientes: (root)=>{
            return new Promise((resolve, rejects)=>{
                Clientes.countDocuments((err, count)=>{
                    if(err) rejects(err)
                    else resolve(count)
                })
            })
        },
        getProductos: (root, {limite, offset})=>{
            return Productos.find().limit(limite).skip(offset)
        },
        getProducto: (root, {id})=>{
            return new Promise((resolve, rejects)=>{
                Productos.findById(id, (err, producto)=>{
                    if(err) rejects(err)
                    else resolve(producto)
                })
            })
        }
    },
    Mutation: {
        crearCliente: (root, {input})=>{
            const nuevoCliente = new Clientes({
                nombre: input.nombre,
                apellido: input.apellido,
                empresa: input.empresa,
                emails: input.emails,
                edad: input.edad,
                tipo: input.tipo,
                pedidos: input.pedidos
            })
            //nuevoCliente.id = nuevoCliente._id
            return new Promise((resolve, rejects)=>{
                nuevoCliente.save((err, nuevoCliente)=>{
                    if(err) rejects(err)
                    else resolve(nuevoCliente)
                })
            })
        },
        actualizarCliente: (root, {input})=>{
            return new Promise((resolve, rejects)=>{
                Clientes.findByIdAndUpdate(input.id, input, {new: true}, (err, cliente)=>{
                    if(err) rejects(err)
                    else resolve(cliente)
                })
            })
        },
        eliminarCliente: (root, {id})=>{
            return new Promise((resolve, rejects)=>{
                Clientes.findByIdAndDelete(id, (err, cliente)=>{
                    if(err){
                        rejects(err)
                    }else{
                        if(!cliente){
                            rejects("No existe ese cliente")
                        }else{
                            //console.log(cliente)
                            resolve(cliente)
                        }
                    }
                })
            })
        },
        crearProducto: (root, {input})=>{
            const nuevoProducto = new Productos({
                nombre: input.nombre,
                precio: input.precio,
                stock: input.stock
            })
            return new Promise((resolve, rejects)=>{
                //nuevoProducto.id = nuevoProducto._id
                nuevoProducto.save((err, nuevoProducto)=>{
                    if(err) rejects(err)
                    else resolve(nuevoProducto)
                })
            })
        },
        actualizarProducto: (root, {input})=>{
            //console.log(input)
            return new Promise((resolve, rejects)=>{
                Productos.findByIdAndUpdate(input.id, input, (err, productoEditado)=>{
                    if(err) rejects(err)
                    else resolve(productoEditado)
                })
            })
        },
        eliminarProducto: (root, {id})=>{
            return new Promise((resolve, rejects)=>{
                Productos.findByIdAndDelete(id, (err, productoEliminado)=>{
                    if(err){
                        rejects(err)
                    }else if(!productoEliminado){
                        rejects("No existe el producto")
                    }else{
                        resolve(productoEliminado)
                    }
                })
            })
        },


        crearUsuario: async(root, {usuario, password})=>{
            const existeUsuario = await Usuarios.findOne({usuario})
            if(existeUsuario) throw new Error('Usuario existente') 

            await new Usuarios({usuario, password}).save()
            return 'Creado correctamente'
        },

        loginUsuario: async (root, {usuario, password})=>{
            const nombreUsuario = await Usuarios.findOne({usuario})
            //if(!nombreUsuario) throw new Error('Usuario no existe')
            if(!nombreUsuario) return 'Usuario no existe'

            const passwordCorrecto = await bcrypt.compare(password, nombreUsuario.password)
            if(!passwordCorrecto) throw new Error('Password incorrecto')

            const payload = {
                id: nombreUsuario.id,
                usuario: nombreUsuario.usuario
            };
            const token = await jwt.sign(payload, TOKEN_SECRET);
            //console.log(token)
            return token
        }
    }
}