import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AccionesUsuarioSalaService extends Mutation {
  document = gql`
  mutation AccionesUsuarioSala(
      $idUsuarioSala: ID,
      $levantarMano: Boolean,
      $compartirPantalla: Boolean
  ) {
      updateUsuarioSala(
          where: {
              id: $idUsuarioSala
          },
          data: {
              levantarMano: $levantarMano,
              compartirPantalla: $compartirPantalla
          }
      ) {
          id
      }
  }`
}
