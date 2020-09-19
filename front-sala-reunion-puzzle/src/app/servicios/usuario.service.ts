import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UsuarioInterface} from '../interfaces/usuario.interface';
import {FIND_ONE_USUARIO, FIND_ALL_USUARIOS} from '../constantes/query/query-usuario';
import {REGISTRAR_USUARIO} from '../constantes/mutation/mutation-usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  nombreUsuario: string;

  constructor(
    private readonly _apollo: Apollo,
  ) {
  }

  findAll(
    username: string,
    password: string
  ): Observable<{ usuarios: UsuarioInterface[] }> {
    return this._apollo
      .query<{ usuarios: UsuarioInterface[] }>({
        query: FIND_ALL_USUARIOS,
        variables: {
          nombre: username,
          password
        }
      })
      .pipe(
        map(resultado => resultado.data)
      );
  }

  findOne(id: string): Observable<{ usuario: UsuarioInterface }> {
    return this._apollo
      .query<{ usuario: UsuarioInterface }>({
        query: FIND_ONE_USUARIO,
        variables: {idUsuario: id}
      })
      .pipe(
        map(resultado => resultado.data)
      );
  }

  registrarUsuario(
    username: string,
    password: string
  ): any {
    return this._apollo
      .mutate({
        mutation: REGISTRAR_USUARIO,
        variables: {
          nombre: username,
          password
        }
      });
  }

  verificarEsAdmin(id: string): Observable<boolean> {
    return this.findOne(id).pipe(
      map((usuario: { usuario: UsuarioInterface }) => {
        return usuario.usuario.esAdmin;
      })
    );
  }
}
