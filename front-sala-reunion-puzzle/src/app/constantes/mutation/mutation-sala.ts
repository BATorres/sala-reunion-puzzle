import gql from 'graphql-tag';

export const CREAR_SALA = gql`
    mutation CrearSala(
        $nombre: String!,
        $descripcion: String
    ) {
        createSala(
            data: {
                nombre: $nombre,
                descripcion: $descripcion
            }
        ) {
            id
            nombre
            descripcion
        }
    }
`;
