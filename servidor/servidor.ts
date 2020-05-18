import {GraphQLServer} from 'graphql-yoga'
import {Prisma} from './generated/prisma-client/index'
import {typeDefs} from './generated/prisma-client/prisma-schema';

const puerto = process.env.PORT || 8081;
const express = require('express');

const servidor = new GraphQLServer({
    typeDefs: typeDefs,
    resolvers: {},
    resolverValidationOptions: {
        requireResolversForResolveType: false
    },
    context: request => ({
        ...request,
        db: Prisma
    }),
});

servidor.express.use(express.static(__dirname + '/../build'));

servidor.start({
    port: puerto
}, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
});