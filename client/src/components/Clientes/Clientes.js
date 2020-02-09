import React, {useState} from 'react';
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

import { GET_CLIENTES } from '../../queries/cliente'
import { ELIMINAR_CLIENTE } from '../../queries/cliente'

import Paginador from '../Paginador'

const Clientes = () => {

    const [pagination, setPagination] = useState({
        currentPage: 1,
        clientsPerPage: 4,
        offset: 0
    })

    const paginaAnterior = ()=>{
        setPagination({
            ...pagination,
            currentPage: pagination.currentPage - 1,
            offset: pagination.offset - pagination.clientsPerPage
        })
    }

    const paginaSiguiente = ()=>{
        setPagination({
            ...pagination,
            currentPage: pagination.currentPage + 1,
            offset: pagination.offset + pagination.clientsPerPage
        })
    }

    return ( 
        <Query 
            query={GET_CLIENTES} 
            variables={{limite: pagination.clientsPerPage, offset: pagination.offset}} 
            pollInterval={1000}
        >
            {({loading, error, data, refetch})=>{
                if(error){
                    return `Error: ${error.message}`
                }
                if(loading){
                    return 'Cargando...'
                }
                //console.log(data)
                return(
                    <React.Fragment>
                        <h2 className="text-center">Listado clientes</h2>
                        <ul className="list-group mt-4">
                            {data.getClientes.map(cliente=>{
                                const {id, nombre, apellido, empresa} = cliente
                                return(
                                    <li key={id} className="list-group-item">
                                        <div className="row justify-content-between align-items center">
                                            <div className="col-md-8 d-flex justify-content-between align-items-center">
                                                {nombre} {apellido} - {empresa}
                                            </div>
                                            <div className="col-md-4 d-flex justify-content-end">
                                            <Mutation 
                                                mutation={ELIMINAR_CLIENTE}
                                                onCompleted={()=>{refetch()}}
                                            >
                                                    {(eliminarCliente)=>{
                                                        return(
                                                            <button 
                                                                className="mr-2 btn btn-danger d-block d-md d-md inline-block"
                                                                onClick={()=>{
                                                                    if(window.confirm('Seguro que desea eliminar?')){
                                                                        eliminarCliente({
                                                                            variables: {
                                                                                id
                                                                            }
                                                                        })
                                                                    }
                                                                }}
                                                            >
                                                                Eliminar cliente
                                                            </button>
                                                        ) 
                                                    }}
                                                </Mutation>
                                                <Link to={`/cliente/editar/${id}`} className="btn btn-success d-block d-md d-md inline-block">
                                                    Editar cliente
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        <Paginador 
                            currentPage={pagination.currentPage} 
                            clientsPerPage={pagination.clientsPerPage} 
                            offset={pagination.offset}
                            totalClientes={data.totalClientes}
                            paginaAnterior={paginaAnterior}
                            paginaSiguiente={paginaSiguiente}
                        />
                    </React.Fragment>
                )
            }}
        </Query>
     );
}
 
export default Clientes;