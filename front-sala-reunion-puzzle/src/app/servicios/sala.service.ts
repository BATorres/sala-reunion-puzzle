import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SalaInterface} from '../interfaces/sala.interface';
import {BUSCAR_SALA_POR_NOMBRE, FIND_ALL_SALA, FIND_ONE} from '../constantes/query/query-sala';
import {CREAR_SALA} from '../constantes/mutation/mutation-sala';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  constructor(
    private _apollo: Apollo,
  ) {
  }

  findAll(): Observable<{ salas: SalaInterface[] }> {
    return this._apollo
      .query<{ salas: SalaInterface[] }>({
        query: FIND_ALL_SALA,
      })
      .pipe(
        map(resultado => resultado.data)
      );
  }

  findOne(id: string): Observable<{ sala: SalaInterface }> {
    return this._apollo
      .query<{ sala: SalaInterface }>({
        query: FIND_ONE,
        variables: { idSala: id }
      })
      .pipe(
        map(resultado => resultado.data)
      );
  }

  buscarPorNombre(nombre: string): Observable<{ salas: SalaInterface[] }> {
    return this._apollo
      .query<{ salas: SalaInterface[] }>({
        query: BUSCAR_SALA_POR_NOMBRE,
        variables: { nombreSala: nombre }
      })
      .pipe(
        map(resultado => resultado.data)
      );
  }

  crearSala(nombre: string) {
    return this._apollo
      .mutate({
        mutation: CREAR_SALA,
        variables: { nombre: nombre }
      });
  }
}
