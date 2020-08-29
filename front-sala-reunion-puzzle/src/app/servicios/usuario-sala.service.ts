import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {ACCIONES_USUARIO_EN_SALA, UNIRSE_A_SALA} from '../constantes/mutation/mutation-usuario-sala';
import {Observable} from 'rxjs';
import {UsuarioSalaInterface} from '../interfaces/usuario-sala.interface';
import {BUSCAR_USUARIO_SALA} from '../constantes/query/query-usuario-sala';
import {map} from 'rxjs/operators';
import {UsuarioService} from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSalaService {
  constructor(
    private readonly _apollo: Apollo,
    private readonly _usuarioService: UsuarioService
  ) {
  }

  buscarUsuarioEnSala(
    idSala: string,
    idUsuario?: string
  ): Observable<{ usuarioSalas: UsuarioSalaInterface[] }> {
    return this._apollo
      .query<{ usuarioSalas: UsuarioSalaInterface[] }>({
        query: BUSCAR_USUARIO_SALA,
        variables: {
          idSala: idSala,
          idUsuario: idUsuario
        }
      })
      .pipe(
        map(resultado => resultado.data)
      );
  }

  verificarUsuarioSala(
    idSala: string,
    idUsuario: string
  ) {
    return this.buscarUsuarioEnSala(idSala, idUsuario)
      .subscribe(
        (usuario: { usuarioSalas: UsuarioSalaInterface[] }) => {
          const existeUsuarioEnSala: boolean = usuario.usuarioSalas.length > 0;

          this._usuarioService
            .verificarEsAdmin(idUsuario)
            .subscribe(
              (esAdmin: boolean) => {
                if (!esAdmin) {
                  if (!existeUsuarioEnSala) {
                    this.unirseASala(idSala, idUsuario);
                  } else {
                    const idUsuarioEnSala: string = usuario.usuarioSalas[0].id;
                    this.accionesUsuarioEnSala(
                      idUsuarioEnSala,
                      false,
                      false
                    )
                  }
                }
              },
              error => {
                console.error({
                  error,
                  mensaje: 'Error verificando rol usuario'
                })
              }
            );
        },
        error => {
          console.error({
            error,
            mensaje: 'Error consultado usuarios en sala'
          })
        }
      );
  }

  unirseASala(
    idSala: string,
    idUsuario: string
  ) {
    return this._apollo
      .mutate({
        mutation: UNIRSE_A_SALA,
        variables: {
          idSala: idSala,
          idUsuario: idUsuario
        }
      })
      .subscribe(
        () => {
        },
        error => {
          console.error({
            error,
            mensaje: 'Error uniendo usuario en sala'
          })
        }
      );
  }

  accionesUsuarioEnSala(
    idUsuarioSala: string,
    levantarMano: boolean,
    compartirPantalla: boolean
  ) {
    return this._apollo
      .mutate({
        mutation: ACCIONES_USUARIO_EN_SALA,
        variables: {
          idUsuarioSala: idUsuarioSala,
          levantarMano: levantarMano,
          compartirPantalla: compartirPantalla
        }
      })
      .subscribe(
        () => {
        },
        error => {
          console.error({
            error,
            mensaje: 'Error con las acciones de usuario en sala'
          })
        }
      );
  }
}

