import gql from 'graphql-tag';

export const CREAR_DIAGRAMA = gql`
    mutation CrearDiagrama(
        $datos: String!,
        $idSala: ID,
        $idUsuario: ID,
        $esDiagramaGlobal: Boolean
    ) {
        createDiagramaUsuario(
            data: {
                diagrama: {
                    create: {
                        datos: $datos,
                        esDiagramaGlobal: $esDiagramaGlobal
                    }
                },
                sala: {
                    connect: {
                        id: $idSala
                    }
                },
                usuario: {
                    connect: {
                        id: $idUsuario
                    }
                }
            }
        ) {
            id
        }
    }`;

export const ACTUALIZAR_DIAGRAMA = gql`
    mutation ActualizarDiagramaService(
        $idDiagramaSala: ID,
        $datos: String!
    ) {
        updateDiagramaUsuario(
            where: {
                id: $idDiagramaSala
            },
            data: {
                diagrama: {
                    update: {
                        datos: $datos,
                    }
                }
            }
        ) {
            id
        },
    }`;
