import {GraphQLServer} from 'graphql-yoga'
import {Prisma} from './generated/prisma-client/index'
import resolvers from './constantes/resolvers'

const puerto = process.env.PORT || 4000;
const express = require('express');

const servidor = new GraphQLServer({
    typeDefs: 'servidor/schema.graphql',
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    },
    context: request => ({
        ...request,
        db: new Prisma({
            endpoint: 'https://sala-reunion-c09c320c32.herokuapp.com/sala-reunion-puzzle/dev',
            debug: true
        })
    }),
});

servidor.express.use(express.static(__dirname + '/../build'));

servidor.start({
    port: puerto,
}, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
});