import React from 'react';
import { Query } from 'react-apollo'
import { GET_CLIENTE } from '../../queries/cliente'
import FormularioEditarCliente from './FormularioEditarCliente'

const EditarCliente = (props) => {
    const idUser = props.match.params.id
    return ( 
        <React.Fragment>
            <h2 className="text-center">Editar cliente</h2>
            <div className="row justify-content-center">
                <Query query={GET_CLIENTE} variables={{id: idUser}}>
                    {({loading, error, data, refetch})=>{
                        if(loading) return 'Cargando...'
                        if(error) return `Error: ${error.message}`
                        //console.log(data.getCliente)
                        return(
                            <FormularioEditarCliente cliente={data.getCliente} refetch={refetch}/>
                        )
                    }}
                </Query>
            </div>
        </React.Fragment>
     );
}
 
export default EditarCliente;