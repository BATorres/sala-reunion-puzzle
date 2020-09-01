import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import {UsuarioSalaInterface} from '../../interfaces/usuario-sala.interface';
import {BUSCAR_USUARIO_SALA} from '../../constantes/query/query-usuario-sala';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuariosEnSalaService extends Query<{usuarioSalas: UsuarioSalaInterface[]}> {
    document = BUSCAR_USUARIO_SALA;
}
