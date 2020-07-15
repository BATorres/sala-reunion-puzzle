import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import {SalaInterface} from '../../interfaces/sala.interface';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class BuscarSalasService extends Query<{salas: SalaInterface[]}>{
    document = gql`
        query BuscarSalas(
            $nombreSala: String,
            $id: ID
        ) {
            salas(
                where: {
                    OR: [
                        {
                            id: $id
                        }
                    ],
                    nombre: $nombreSala
                }
                orderBy: createdAt_DESC
            ) {
                id
                nombre
            }
        }
    `;
}
