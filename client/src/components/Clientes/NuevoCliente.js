import React, {useState} from 'react';
import { Mutation } from 'react-apollo'
import { POST_CLIENTE } from '../../queries/cliente'

const NuevoCliente = (props) => {

    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        edad: '',
        empresa: '',
        tipo: '',
        emails: []
    })
    const [error, setError] = useState(false)
    const [emails, setEmails] = useState([])

    const setForm = (e)=>{
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e, crearCliente)=>{
        e.preventDefault()
        const {nombre, apellido, edad, empresa, tipo} = cliente
        if(nombre === '' || apellido === '' || empresa === '' || edad === ''  || tipo === ''){
            setError(true)
            return;
        }else{
            setError(false)
        }
        const input = {
            nombre,
            apellido,
            edad: Number(edad),
            empresa,
            tipo,
            emails
        }
        //console.log(input)
        crearCliente({
            variables: {
                input
            }
        })
    }

    const NuevoInputEmail =()=>{
        setEmails(emails.concat([{email: ''}]))
    }

    const QuitarInputEmail = (index)=>{
        const newEmails = emails.filter((email, i)=>{
            return(
                i !== index
            )
        })
        setEmails(newEmails)
    }

    return ( 
        <React.Fragment>
            <h2 className="text-center">Nuevo cliente</h2>
            {error && <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p>}
            <div className="row justify-content-center">
                <Mutation 
                    mutation={POST_CLIENTE}
                    onCompleted={()=>{props.history.push('/')}}
                >
                    {(crearCliente=>{
                        return(
                            <form className="col-md-8 m-3" onSubmit={(e)=>{handleSubmit(e, crearCliente)}}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Nombre</label>
                                        <input name="nombre" type="text" className="form-control" placeholder="Nombre" 
                                        onChange={setForm}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Apellido</label>
                                        <input name="apellido" type="text" className="form-control" placeholder="Apellido" onChange={setForm} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label>Empresa</label>
                                        <input name="empresa" type="text" className="form-control" placeholder="Empresa" onChange={setForm}/>
                                    </div>
                                    {emails.map((input, index)=>{
                                        return(
                                            <div key={index} className="form-group col-md-12">
                                                <label>Correo {index + 1}</label>
                                                <div className="input-group">
                                                    <input placeholder="Email" className="form-control"
                                                        onChange={(e)=>{
                                                            //console.log(e.target.value, index)
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
                                                    />
                                                    <div className="input-group-append">
                                                        <button type="button" className="btn btn-danger" onClick={()=>{QuitarInputEmail(index)}}>&times; Eliminar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div className="form-group d-flex justifiy-content-center col-md-12">
                                        <button 
                                            onClick={NuevoInputEmail}
                                            type="button"
                                            className="btn btn-warning"
                                        >
                                            + Agregar email
                                        </button>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Edad</label>
                                        <input name="edad" type="text" className="form-control" placeholder="Edad" onChange={setForm}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Tipo Cliente</label>  
                                        <select className="form-control" name="tipo" onChange={setForm}>
                                            <option value="">Elegir...</option>
                                            <option value="PREMIUM">PREMIUM</option>
                                            <option value="BASICO">BÁSICO</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                            </form>
                        )
                    })}
                </Mutation>
            </div>
        </React.Fragment>
     );
}
 
export default NuevoCliente;