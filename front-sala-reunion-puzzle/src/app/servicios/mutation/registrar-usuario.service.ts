import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class RegistrarUsuarioService extends Mutation {
    document = gql`
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
}
