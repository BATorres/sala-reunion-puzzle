import gql from 'graphql-tag';

export const BUSCAR_DIAGRAMA_USUARIO = gql`
    query BuscarDiagramaUsuario(
        $idSala: ID,
        $idUsuario: ID
    ) {
        diagramaUsuarios(
            where: {
                AND: [
                    {
                        sala: {
                            id: $idSala
                        }
                    },
                    {
                        usuario: {
                            id: $idUsuario
                        }
                    }
                ]
            }
        ) {
            id
            diagrama {
                datos
            }
        }
    }`;

export const BUSCAR_DIAGRAMA_GLOBAL = gql`
    query BuscarDiagramaUsuario(
        $idSala: ID
    ) {
        diagramaUsuarios(
            where: {
                AND: [
                    {
                        sala: {
                            id: $idSala
                        }
                    },
                    {
                        diagrama: {
                            esDiagramaGlobal: true
                        }
                    }
                ]
            }
        ) {
            id
            diagrama {
                datos
            }
        }
    }`;
