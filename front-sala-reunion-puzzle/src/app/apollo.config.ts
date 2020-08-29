import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {WebSocketLink} from 'apollo-link-ws';
import {split} from 'apollo-link';
import {getMainDefinition} from 'apollo-utilities';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const linkHttp: string = 'https://sala-reunion-c09c320c32.herokuapp.com/sala-reunion-puzzle/dev';
    const http = httpLink.create({
      uri: linkHttp
    });

    const linkWs: string = 'wss://sala-reunion-c09c320c32.herokuapp.com/sala-reunion-puzzle/dev';
    const ws = new WebSocketLink({
      uri: linkWs,
      options: {
        reconnect: true,
        timeout: 50000
      }
    });

    const link = split(
      ({query}) => {
        const {kind, operation} = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      ws,
      http
    );
    apollo.create({
      link,
      cache: new InMemoryCache()
    })
  }
}
