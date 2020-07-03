import gql from 'graphql-tag'

export const LISTAR_SALAS = gql`
    query ListarSalas {
        salas(orderBy: createdAt_DESC) {
            id
            nombre
        }
    }`;
