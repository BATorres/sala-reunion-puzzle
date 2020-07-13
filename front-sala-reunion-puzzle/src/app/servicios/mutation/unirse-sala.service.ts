import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class UnirseSalaService extends Mutation {
    document = gql`
        mutation UnirseASala(
            $idSala: ID,
            $idUsuario: ID
        ) {
            createUsuarioSala(
                data: {
                    sala: {
                        connect: {
                            id: $idSala
                        }
                    },
                    usuario:
                    {
                        connect:
                        {
                            id: $idUsuario
                        }
                    }
                }
            ) {
                id
            }
        }`
}
