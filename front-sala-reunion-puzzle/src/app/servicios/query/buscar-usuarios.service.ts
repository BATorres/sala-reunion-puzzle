import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag'
import {UsuarioInterface} from '../../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuariosService extends Query<{usuarios: UsuarioInterface[]}>{
    document = gql`
        query BuscarUsuarios($nombre: String!) {
            usuarios(where: {nombre: $nombre}) {
                id
                nombre
            }
        }
    `;
}