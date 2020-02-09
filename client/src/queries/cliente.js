import gql from 'graphql-tag'

export const GET_CLIENTES = gql`
  query getClientes($limite: Int, $offset: Int){
      getClientes(limite: $limite, offset: $offset){
      id 
      nombre 
      apellido
      empresa 
      emails{
        email
      }
      edad
    }
    totalClientes
  }   
`

export const GET_CLIENTE = gql`
  query getCliente ($id: ID!){
    getCliente(id: $id){
      id 
      nombre 
      apellido 
      empresa 
      emails {
        email
      } edad 
      tipo 
      pedidos {
        producto precio
      }
    }
  }
`

export const POST_CLIENTE = gql`
  mutation crearCliente ($input: ClienteInput){
    crearCliente(input: $input){
      id nombre apellido edad empresa tipo
    }
  }
`

export const ACTUALIZAR_CLIENTE = gql`
  mutation actualizarCliente($input: ClienteInput){
    actualizarCliente(input: $input){
      id nombre empresa apellido tipo edad
      emails {
        email
      }
    }
  }
`


export const ELIMINAR_CLIENTE = gql`
mutation eliminarCliente($id: ID!){
  eliminarCliente(id: $id){
    id nombre
  }
}`