import express from 'express'
import mongoose from 'mongoose'

import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './data/schema'
import { resolvers } from './data/resolvers'

const app = express()
const server = new ApolloServer({typeDefs, resolvers})

server.applyMiddleware({app})

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)
mongoose.connect('mongodb://localhost/graphql-clientes', ()=>{
    console.log("Conectado a MongoDB")
})

const PORT = 5000
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en ${server.graphqlPath}`)
})