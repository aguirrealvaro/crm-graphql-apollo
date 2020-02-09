import React from 'react';
import { GET_PRODUCTOS, ELIMINAR_PRODUCTO } from '../../queries/producto'
import { Query, Mutation } from 'react-apollo'
import {Link} from 'react-router-dom'

const Productos = () => {
    return ( 
        <React.Fragment>
            <h1 className="text-center mb-5">Productos</h1>
            <Query
                query={GET_PRODUCTOS}
                //pollInterval={1000}
                //variables={{limite: pagination.clientsPerPage, offset: pagination.offset}} 
            >
                {({loading, error, data, refetch})=>{
                    if(error) return `Error: ${error.message}`
                    if(loading) return 'Cargando...'
                    //console.log(data.getProductos)
                    return(
                        <table className="table">
                            <thead>
                                <tr className="table-primary">
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Eliminar</th>
                                    <th scope="col">Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.getProductos.map(item=>{
                                    const {id, nombre, stock, precio} = item
                                    return(
                                        <tr key={id}>
                                            <td>{nombre}</td>
                                            <td>{precio}</td>
                                            <td>{stock}</td>
                                            <td>
                                                <Mutation
                                                    mutation={ELIMINAR_PRODUCTO}
                                                    variables={{id}}
                                                    onCompleted={()=>{refetch()}}
                                                >
                                                    {(eliminarProducto)=>{
                                                        return(
                                                            <button 
                                                                type="button" 
                                                                className="btn btn-danger"
                                                                onClick={()=>{eliminarProducto()}}
                                                            >&times; Eliminar</button>
                                                        )
                                                    }}
                                                </Mutation>
                                            </td>
                                            <td>
                                                <Link to={`/producto/editar/${id}`} className="btn btn-success">Editar</Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )
                }}
            </Query>
        </React.Fragment>
     );
}
 
export default Productos;