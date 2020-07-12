import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class CrearSalaService extends Mutation{
  document = gql`
  mutation CrearSala($nombre: String!, $descripcion: String) {
      createSala(
          data: {
              nombre: $nombre, 
              descripcion: $descripcion
          }
      ) {
          id
          nombre
          descripcion
      }
  }
  `
}
