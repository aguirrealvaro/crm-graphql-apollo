import React, {useState} from 'react';
import { Mutation } from 'react-apollo'
import {ACTUALIZAR_CLIENTE} from '../../queries/cliente'
import { withRouter } from 'react-router-dom'

const FormularioEditarCliente = (props) => {
    const [cliente, setCliente] = useState(props.cliente)
    const [emails, setEmails] = useState(props.cliente.emails)

    const nuevoInputEmail = () => {
        setEmails( emails.concat([{email:''}]))
    }

    const quitarInputEmail = (index)=>{
        const newEmails = emails.filter((email, i)=>{
            return(
                i !== index
            )
        })
        setEmails(newEmails)
    }

    const setForm = (e)=>{
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e, actualizarCliente)=>{
        e.preventDefault()
        const {id, nombre, apellido, empresa, edad, tipo} = cliente

        const input = {
            id,
            nombre,
            apellido,
            empresa,
            edad: Number(edad),
            tipo,
            emails
        }
        //console.log(input)
        actualizarCliente({
            variables: {
                input
            }
        })
    }

    const {nombre, apellido, empresa, edad, tipo} = cliente

    return ( 
        <Mutation 
            mutation={ACTUALIZAR_CLIENTE}
            onCompleted={()=>{
                props.refetch().then(()=>{
                    props.history.push('/')
                })
            }}
        >
            {(actualizarCliente)=>{
                return(
                    <form className="col-md-8 m-3" onSubmit={(e)=>{handleSubmit(e, actualizarCliente)}}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Nombre</label>
                                <input
                                    name="nombre"
                                    onChange={setForm}
                                    type="text" 
                                    className="form-control" 
                                    defaultValue={nombre}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Apellido</label>
                                <input 
                                    name="apellido"
                                    onChange={setForm}
                                    type="text" 
                                    className="form-control" 
                                    defaultValue={apellido}
                                />
                            </div>
                        </div>
                    
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label>Empresa</label>
                                <input
                                    name="empresa"
                                    onChange={setForm}
                                    type="text" 
                                    className="form-control" 
                                    defaultValue={empresa}
                                />
                            </div>

                            {emails.map((input, index) => (
                                <div key={index} className="form-group col-md-12">
                                    <label>Email {index + 1} : </label>
                                    <div className="input-group">
                                        <input 
                                            type="email"
                                            placeholder={`Email`}
                                            className="form-control" 
                                            onChange={(e)=>{
                                                const newEmails = emails.map((email, i)=>{
                                                    if(i===index){
                                                        return({
                                                            email: e.target.value
                                                        })
                                                    }else{
                                                        return email
                                                    }
                                                })
                                                setEmails(newEmails)
                                            }}
                                            defaultValue={input.email}
                                        />
                                        <div className="input-group-append">
                                            <button 
                                                className="btn btn-danger" 
                                                type="button" 
                                                onClick={()=>{quitarInputEmail(index)}}> 
                                                &times; Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="form-group d-flex justify-content-center col-md-12">
                                <button 
                                    onClick={nuevoInputEmail}
                                    type="button" 
                                    className="btn btn-warning"
                                >+ Agregar Email</button>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Edad</label>
                                <input
                                    name="edad"
                                    onChange={setForm}
                                    type="text" 
                                    className="form-control" 
                                    defaultValue={edad}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Tipo Cliente</label>  
                                <select 
                                    className="form-control"
                                    defaultValue={tipo}
                                    name="tipo"
                                    onChange={setForm}
                                >
                                    <option value="">Elegir...</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                    <option value="BASICO">BÁSICO</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                    </form>
                )
            }}
        </Mutation>
     );
}
 
export default withRouter(FormularioEditarCliente);