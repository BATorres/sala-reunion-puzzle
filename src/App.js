import React, {Component} from 'react';
import './App.css';
import DefinicionRutas from "./rutas/definicion-rutas/DefinicionRutas";
import {ApolloClient, InMemoryCache, split} from "apollo-client-preset";
import {ApolloProvider} from "react-apollo";
import {WebSocketLink} from "apollo-link-ws";
import {getMainDefinition} from "apollo-utilities";
import {HttpLink} from "apollo-link-http";

const webSocketLink = new WebSocketLink({
    uri: `ws://${window.location.host}`,
    options: {
        reconnect: true
    }
});

const httpLink = new HttpLink({
    uri: '/'
});

const link = split(
    ({query}) => {
        const definicion = getMainDefinition(query);
        return (
            definicion.kind === 'OperationDefinition' &&
            definicion.operation === 'subscription'
        );
    },
    webSocketLink,
    httpLink
);

const cliente = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={cliente}>
                <DefinicionRutas/>
            </ApolloProvider>
        )
    }
}

export default App;
