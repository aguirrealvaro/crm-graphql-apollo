import React from 'react';
import { Query } from 'react-apollo'
import { GET_PRODUCTO } from '../../queries/producto'
import FormularioEditarProducto from './FormularioEditarProducto'

const EditarProducto = (props) => {
    const idProd = props.match.params.id
    
    return ( 
        <React.Fragment>
            <h1 className="text-center">Editar producto</h1>
            <div className="row justify-content-center">
                <Query
                    query={GET_PRODUCTO}
                    variables={{id: idProd}}
                >
                    {({loading, error, data, refetch})=>{
                        if(error) return `Error: ${error.message}`
                        if(loading) return 'Cargando...'
                        console.log(data)
                        return(
                            <FormularioEditarProducto producto={data.getProducto} refetch={refetch}/>
                        )
                    }}
                </Query>
            </div>
        </React.Fragment>
     );
}
 
export default EditarProducto;