import {Injectable} from '@angular/core';
import {Subscription} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class NuevaSalaService extends Subscription {
    document = gql`
        subscription {
            sala {
                node {
                    id
                    nombre
                }
            }
        }`;
}
