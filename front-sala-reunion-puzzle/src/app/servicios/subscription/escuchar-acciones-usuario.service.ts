import {Injectable} from '@angular/core';
import {Subscription} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class EscucharAccionesUsuarioService extends Subscription{
    document = gql`
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
        }`;
}
