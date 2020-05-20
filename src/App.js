import React, {Component} from 'react';
import './App.css';
import Rutas from "./componentes/Rutas/Rutas";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";

const cliente = new ApolloClient({
    uri: 'http://localhost:8081'
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={cliente}>
                <Rutas />
            </ApolloProvider>
        )
    }
}

export default App;
