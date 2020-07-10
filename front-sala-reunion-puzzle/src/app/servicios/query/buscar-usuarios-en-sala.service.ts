import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {UsuarioSalaInterface} from '../../interfaces/usuario-sala.interface';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuariosEnSalaService extends Query<{usuariosSalas: UsuarioSalaInterface[]}> {
    document = gql`
        query BuscarUsuariosEnSala($id: ID!) {
            usuarioSalas(
                where: {
                    sala: {
                        id: $id
                    }
                }
            ) {
                id
                levantarMano
                compartirPantalla
                usuario {
                    id
                }
                sala {
                    id
                }
            }
        }
    `;
}
