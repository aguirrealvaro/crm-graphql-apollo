import React, { useState } from "react";
import { LOGIN_USUARIO } from "../../queries/usuario";
import { Mutation } from 'react-apollo'

const Login = () => {
  const [inputLogin, setInputLogin] = useState({
    usuario: "",
    password: ""
  });

  const {usuario, password} = inputLogin

  const handleChange = e => {
    const { name, value } = e.target;
    setInputLogin({
      ...inputLogin,
      [name]: value
    });
  };

  const handleSubmit = (e, loginUsuario)=>{
      e.preventDefault()
      loginUsuario()
      .then(data=>{
        const token = data.data.loginUsuario
        localStorage.setItem('token', token)
      })
  }

  return (
    <React.Fragment>
      <h1 className="text-center mb-5">Iniciar Sesión</h1>
      <div className="row  justify-content-center">
        <Mutation 
            mutation={LOGIN_USUARIO} 
            variables={{ usuario, password }}
        >
          {(loginUsuario, { loading, error, data }) => {
            return (
              <form
                onSubmit={e => handleSubmit(e, loginUsuario)}
                className="col-md-8"
              >
                <div className="form-group">
                  <label>Usuario</label>
                  <input
                    onChange={handleChange}
                    value={usuario}
                    type="text"
                    name="usuario"
                    className="form-control"
                    placeholder="Nombre Usuario"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    onChange={handleChange}
                    value={password}
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>

                <button
                  //disabled={loading || this.validarForm()}
                  type="submit"
                  className="btn btn-success float-right"
                >
                  Iniciar Sesión
                </button>
              </form>
            );
          }}
        </Mutation>
      </div>
    </React.Fragment>
  );
};

export default Login;
