import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import {SalaInterface} from '../../interfaces/sala.interface';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class BuscarSalasService extends Query<{salas: SalaInterface[]}>{
    document = gql`
        query BuscarSalas($nombreSala: String) {
            salas(where: {nombre: $nombreSala}) {
                id
                nombre
            }
        }
    `;
}
