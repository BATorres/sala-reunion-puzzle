import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ActualizarDiagramaService extends Mutation {
  document = gql`
  mutation ActualizarDiagramaService(
      $idDiagramaSala: ID,
      $datos: String!
  ) {
      updateDiagramaUsuario(
          where: {
              id: $idDiagramaSala
          },
          data: {
              diagrama: {
                  update: {
                      datos: $datos,
                  }
              }
          }
      ) {
          id
      },
  }`
}
