import gql from 'graphql-tag'

export const NUEVO_USUARIO = gql`
    mutation crearUsuario($usuario: String!, $password: String!){
        crearUsuario(usuario: $usuario, password: $password)
    }
`

export const LOGIN_USUARIO = gql`
    mutation loginUsuario($usuario: String!, $password: String!){
        loginUsuario(usuario: $usuario, password: $password)
    }
`