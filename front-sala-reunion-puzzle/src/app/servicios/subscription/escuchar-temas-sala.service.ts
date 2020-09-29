import {Injectable} from '@angular/core';
import {Subscription} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class EscucharTemasSalaService extends Subscription{
    document = gql`
        subscription {
            temaSala(
                where: {
                    mutation_in: [CREATED]
                }
            ) {
                node {
                    id
                    sala {
                        id
                        nombre
                    }
                }
            }
        }`;
}
