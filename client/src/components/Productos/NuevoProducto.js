import React, { useState } from 'react';
import { Mutation } from 'react-apollo'
import { CREAR_PRODUCTO } from '../../queries/producto'

const NuevoProducto = (props) => {
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        stock: ''
    })
    const setForm=(e)=>{
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e, crearProducto)=>{
        e.preventDefault()
        const {nombre, precio, stock} = producto

        const input = {
            nombre: nombre,
            precio: Number(precio),
            stock: Number(stock)
        }
        crearProducto({
            variables: {
                input
            }
        })/* .then(data=>{
            console.log(data)
        }).catch(err=>{
            console.log(err.message)
        }) */
    }

    return ( 
        <React.Fragment>
            <h2 className="text-center">Nuevo cliente</h2>
            <div className="row justify-content-center">
                <Mutation 
                    mutation={CREAR_PRODUCTO} 
                    onCompleted={()=>{props.history.push('/productos')}}>
                    {(crearProducto, {loading, error, data})=>{
                        
                        return(
                            <form 
                                className="col-md-8"
                                onSubmit={(e)=>{handleSubmit(e, crearProducto)}}
                            >
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input 
                                        type="text"
                                        name="nombre" 
                                        className="form-control" 
                                        placeholder="Nombre del Producto"
                                        onChange={setForm}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio:</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">$</div>
                                        </div>
                                        <input 
                                            type="number" 
                                            name="precio" 
                                            className="form-control" 
                                            placeholder="Precio del Producto"
                                            onChange={setForm}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Stock:</label>
                                    <input 
                                        type="number" 
                                        name="stock" 
                                        className="form-control" 
                                        placeholder="stock del Producto" 
                                        onChange={setForm}
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={!producto.nombre || !producto.precio || !producto.stock ? true : false}
                                    className="btn btn-success float-right">
                                        Crear Producto
                                </button>
                            </form>
                        )
                    }}
                </Mutation>
            </div>
            
        </React.Fragment>
        
     );
}
 
export default NuevoProducto;