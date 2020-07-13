import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {UsuarioSalaInterface} from '../../interfaces/usuario-sala.interface';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuariosEnSalaService extends Query<{usuarioSalas: UsuarioSalaInterface[]}> {
    document = gql`
        query BuscarUsuariosEnSala(
            $idSala: ID, 
            $idUsuario: ID
        ) {
            usuarioSalas(
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
                orderBy: createdAt_DESC
            ) {
                id
                levantarMano
                compartirPantalla
                usuario {
                    id
                    nombre
                }
                sala {
                    id
                }
            }
        }
    `;
}
