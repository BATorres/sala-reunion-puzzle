import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TemaSalaInterface} from '../interfaces/tema-sala.interface';
import {FIND_TEMAS_SALA} from '../constantes/query/query-temas-sala';
import {ACTUALIZAR_SALA} from '../constantes/mutation/mutation-sala';

@Injectable({
  providedIn: 'root'
})
export class TemasSalaService {
  constructor(
    private _apollo: Apollo,
  ) {
  }

  buscarTemasPorSala(idSala: string): Observable<{ temaSalas: TemaSalaInterface[] }> {
    return this._apollo
      .query<{ temaSalas: TemaSalaInterface[] }>({
        query: FIND_TEMAS_SALA,
        variables: { idSala }
      })
      .pipe(
        map(resultado => resultado.data)
      );
  }

  guardarTemasDeSala(
    idSala: string,
    temasSala: TemaSalaInterface[]
  ): Observable<any> {
    return this._apollo
      .mutate({
        mutation: ACTUALIZAR_SALA,
        variables: {
          idSala,
          temasDeSala: temasSala
        }
      });
  }
}
