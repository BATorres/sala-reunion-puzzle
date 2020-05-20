import {GraphQLServer} from 'graphql-yoga'
import {Prisma} from './generated/prisma-client/index'
import {querySalas} from './resolvers/query/query-salas';
import {mutationSalas} from './resolvers/mutation/mutation-salas';
import {mutationUsuarios} from './resolvers/mutation/mutation-usuarios';

const puerto = process.env.PORT || 8081;
const express = require('express');

const servidor = new GraphQLServer({
    typeDefs: 'servidor/schema.graphql',
    resolvers: {
        Query: {
            ...querySalas
        },
        Mutation: {
            ...mutationSalas,
            ...mutationUsuarios
        }
    },
    resolverValidationOptions: {
        requireResolversForResolveType: false
    },
    context: request => ({
        ...request,
        db: new Prisma({
            endpoint: "https://sala-reunion-c09c320c32.herokuapp.com/sala-reunion-puzzle/dev",
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