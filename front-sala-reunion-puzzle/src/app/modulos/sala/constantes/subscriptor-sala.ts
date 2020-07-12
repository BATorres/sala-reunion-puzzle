import gql from 'graphql-tag'

export const NUEVA_SALA = gql`
    subscription {
        sala {
            node {
                id
                nombre
            }
        }
    }
`;
