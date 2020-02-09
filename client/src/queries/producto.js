import gql from 'graphql-tag'

export const CREAR_PRODUCTO = gql`
    mutation crearProducto ($input: ProductoInput){
        crearProducto(input: $input){
            id nombre precio stock
        }
}
`

export const GET_PRODUCTOS = gql`
    query getProductos($limite: Int, $offset: Int){
        getProductos(limite: $limite, offset: $offset){
            id nombre precio stock
        }
    }
`

export const GET_PRODUCTO = gql`
    query getProducto($id:ID!){
        getProducto(id: $id){
            id nombre precio stock
        }
    }
`

export const ACTUALIZAR_PRODUCTO = gql`
    mutation actualizarProducto($input: ProductoInput){
        actualizarProducto(input: $input){
            id nombre precio stock
        }
    }
`

export const ELIMINAR_PRODUCTO = gql`
    mutation eliminarProducto($id: ID!){
    eliminarProducto(id: $id){
            id 
        }
    }
`
