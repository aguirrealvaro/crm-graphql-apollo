import React from "react";
import { useState } from 'react'
import { Mutation } from 'react-apollo'
import { NUEVO_USUARIO } from '../../queries/usuario'

const Registro = (props) => {
    const [inputRegister, setInputRegister] = useState({
        usuario: '',
        password: '', 
        password2: ''
    })

    const handleChange = (e)=>{
        const {name,value} = e.target
        setInputRegister({
            ...inputRegister,
            [name]: value
        })
    }

    const handleSubmit = (e, crearUsuario)=>{
        e.preventDefault()
        crearUsuario()
    }

  return (
    <React.Fragment>
      <h1 className="text-center mb-5">Nuevo Usuario</h1>
      <div className="row  justify-content-center">
        <Mutation
            mutation={NUEVO_USUARIO}
            variables={{usuario:inputRegister.usuario, password:inputRegister.password}}     
            onCompleted={()=>{props.history.push('/login')}}   
        >
            {(crearUsuario)=>{
                return(
                    <form className="col-md-8" onSubmit={e=>handleSubmit(e, crearUsuario)}>
                    <div className="form-group">
                        <label>Usuario</label>
                        <input
                        type="text"
                        name="usuario"
                        className="form-control"
                        placeholder="Nombre Usuario"
                        onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Repetir Password</label>
                        <input
                        type="password"
                        name="password2"
                        className="form-control"
                        placeholder="Repetir Password"
                        onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-success float-right">
                        Crear Usuario
                    </button>
                    </form>
                )
            }}
        </Mutation>
      </div>
    </React.Fragment>
  );
};

export default Registro;
