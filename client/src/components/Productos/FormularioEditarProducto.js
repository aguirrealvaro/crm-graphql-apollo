import React from 'react';
import { useState } from 'react'
import { ACTUALIZAR_PRODUCTO } from '../../queries/producto'
import { Mutation } from 'react-apollo'
import { useHistory } from 'react-router-dom'

const FormularioEditarProducto = (props) => {
    const history = useHistory()
    const [producto, setProducto] = useState(props.producto)

    const handleChange=(e)=>{
        const {name, value} = e.target
        setProducto({
            ...producto,
            [name]: value
        })
    }

    const handleSubmit=(e, actualizarProducto)=>{
        e.preventDefault()
        actualizarProducto()
        /* .then((res)=>console.log(res))
        .catch((err)=>console.log(err)) */
    }

    const input={
        id: producto.id,
        nombre: producto.nombre,
        precio: Number(producto.precio),
        stock: Number(producto.stock)
    }
    return ( 
        <Mutation
            mutation={ACTUALIZAR_PRODUCTO}
            variables={{input}}
            onCompleted={()=>{
                props.refetch().then(()=>{
                    history.push('/productos')
                })
            }}
            key={props.producto.id}
        >
            {(actualizarProducto)=>{
                return(
                    <form onSubmit={(e)=>{handleSubmit(e, actualizarProducto)}} className="col-md-8" >
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input 
                                onChange={handleChange}
                                type="text"
                                name="nombre" 
                                className="form-control" 
                                placeholder="Nombre del Producto"
                                defaultValue={producto.nombre}
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                                <input 
                                    onChange={handleChange}
                                    type="number" 
                                    name="precio" 
                                    className="form-control" 
                                    defaultValue={producto.precio}
                                    placeholder="Precio del Producto"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Stock:</label>
                            <input 
                                onChange={handleChange}
                                type="number" 
                                name="stock" 
                                className="form-control" 
                                placeholder="stock del Producto" 
                                defaultValue={producto.stock}
                            />
                        </div>
                        <button 
                            //disabled={ this.validarForm() }
                            type="submit" 
                            className="btn btn-success float-right">
                                    Guardar Cambios
                        </button>
                    </form>
                )
            }}
        </Mutation>
        
     );
}
 
export default FormularioEditarProducto;