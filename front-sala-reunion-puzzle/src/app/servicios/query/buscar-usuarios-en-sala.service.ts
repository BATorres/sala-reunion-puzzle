import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {UsuarioSalaInterface} from '../../interfaces/usuario-sala.interface';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuariosEnSalaService extends Query<{usuarioSalas: UsuarioSalaInterface[]}> {
    document = gql`
        query BuscarUsuariosEnSala($idSala: ID!) {
            usuarioSalas(
                where: {
                    sala: {
                        id: $idSala
                    }
                }
                orderBy: createdAt_DESC
            ) {
                id
                levantarMano
                compartirPantalla
                usuario {
                    nombre
                }
                sala {
                    id
                }
            }
        }
    `;
}
