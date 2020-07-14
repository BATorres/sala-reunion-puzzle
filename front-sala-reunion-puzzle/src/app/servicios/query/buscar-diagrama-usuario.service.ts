import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import {DiagramaUsuarioInterface} from '../../interfaces/diagrama-usuario.interface';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class BuscarDiagramaUsuarioService extends Query<{diagramaUsuarios: DiagramaUsuarioInterface[]}>{
  document = gql`
  query BuscarDiagramaUsuario(
      $idSala: ID,
      $idUsuario: ID,
      $esDiagramaGlobal: Boolean
  ) {
      diagramaUsuarios(
          where: {
              AND: [
                  {
                      sala: {
                          id: $idSala
                      }
                  },
                  {
                      usuario: {
                          id: $idUsuario
                      }
                  },
                  {
                      diagrama: {
                          esDiagramaGlobal: $esDiagramaGlobal
                      }
                  }
              ]
          }
      ) {
          id
          diagrama {
              datos
          }
      }
  }`;
}
