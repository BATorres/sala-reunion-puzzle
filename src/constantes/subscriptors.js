import gql from "graphql-tag";

export const NUEVA_SALA = gql`
    subscription {
        sala {
            node {
                id
                nombre
            }
        }
    }`;

export const NUEVO_USUARIO_SALA = gql`
    subscription {
        usuarioSala(
            where: {
                mutation_in: [CREATED]
            }
        ){
            node {
                id
                levantarMano
                compartirPantalla
                usuario {
                    id
                    nombre
                }
                sala {
                    id
                    nombre
                }
            }
        }
    }`;

export const CAMBIOS_USUARIO = gql`
    subscription {
        usuarioSala(
            where: {
                mutation_in: [UPDATED]
            }
        ) {
            node {
                id
                levantarMano
                compartirPantalla
                usuario {
                    id
                    nombre
                }
                sala {
                    id
                    nombre
                }
            }
        }
    }
`;

export const CAMBIOS_DIAGRAMA_USUARIO = gql`
subscription {
    diagrama(
        where: {
            mutation_in: [
                CREATED,
                UPDATED
            ]
        }
    ) {
        node {
            datos
            diagramasPorUsuario {
                sala {
                    id
                }
                usuario {
                    id
                }
            }
        }
    }
}`;
