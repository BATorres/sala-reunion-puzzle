import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class CrearDiagramaService extends Mutation {
  document = gql`
  mutation CrearDiagrama(
      $datos: String!,
      $idSala: ID,
      $idUsuario: ID,
      $esDiagramaGlobal: Boolean
  ) {
      createDiagramaUsuario(
          data: {
              diagrama: {
                  create: {
                      datos: $datos,
                      esDiagramaGlobal: $esDiagramaGlobal
                  }
              },
              sala: {
                  connect: {
                      id: $idSala
                  }
              },
              usuario: {
                  connect: {
                      id: $idUsuario 
                  }
              }
          }
      ) {
          id
      }
  }`
}
