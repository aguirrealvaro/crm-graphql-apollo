import React from 'react';

const Paginador = (props) => {
    const {currentPage, clientsPerPage, totalClientes, paginaAnterior, paginaSiguiente} = props
    //console.log(currentPage, clientsPerPage, offset, totalClientes)
    const cantidadDePaginas = Math.ceil(totalClientes/clientsPerPage)
    //console.log(cantidadDePaginas)
    return ( 
        <div className="mt-5 d-flex justify-content-center">
            {currentPage > 1 && <button 
                                    type="button" 
                                    className="btn btn-success mr-2"
                                    onClick={paginaAnterior}
                                >
                                    &laquo; Anterior
                                </button>}
            {currentPage !== cantidadDePaginas && <button 
                                                    type="button" 
                                                    className="btn btn-success mr-2"
                                                    onClick={paginaSiguiente}   
                                                    >       
                                                        Siguiente &raquo; 
                                                    </button>}
        </div>
     );
}
 
export default Paginador;