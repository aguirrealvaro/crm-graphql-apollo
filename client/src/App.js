import React from 'react';
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Header from './components/Layout/Header'
import Clientes from './components/Clientes/Clientes'
import NuevoCliente from './components/Clientes/NuevoCliente'
import EditarCliente from './components/Clientes/EditarCliente'
import NuevoProducto from './components/Productos/NuevoProducto'
import Productos from './components/Productos/Productos'
import EditarProducto from './components/Productos/EditarProducto'
import Registro from './components/Auth/Registro'
import Login from './components/Auth/Login'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  /* fetchOptions:{
    credentials: 'include'
  }, */
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkError, graphQLErrors})=>{
    console.log('graphQLErrors: ', graphQLErrors)
    console.log('networkError: ', networkError)
  }
})

function App() {

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header/>
        <div className="container">
          <Switch>
            <Route exact path='/' component={Clientes}/>
            <Route exact path='/cliente/nuevo' component={NuevoCliente}/>
            <Route exact path='/cliente/editar/:id' component={EditarCliente}/>
            <Route exact path='/productos' component={Productos}/>
            <Route exact path='/producto/nuevo/' component={NuevoProducto}/>
            <Route exact path='/producto/editar/:id' component={EditarProducto}/>
            <Route exact path='/registro' component={Registro}/>
            <Route exact path='/login' component={Login}/>
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
