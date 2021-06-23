import gql from 'graphql-tag';

export const REGISTRAR_USUARIO = gql`
    mutation RegistrarUsuario($nombre: String!, $password: String) {
        createUsuario(
            data: {
                nombre: $nombre,
                password: $password
            }
        ) {
            id
        }
    }
`;
