import React, {Component} from 'react';
import io from "socket.io-client";
import {Container, Button, Col, Row, Card} from "react-bootstrap";
import {Query, Subscription} from 'react-apollo';
import gql from "graphql-tag";

const LISTAR_SALAS = gql`
    query {
        findAllSalas {
            id
            nombre
        }
    }`;

const NUEVA_SALA = gql`
    subscription {
        salaCreada {
            id
            nombre
        }
    }`;

let unsubscribe;

class ListarSalas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: localStorage.getItem('usuario'),
            usuarioAdmin: localStorage.getItem('usuarioAdmin'),
        };

        /*const socket = io('/');
        socket.on('salasDisponibles', (salas) => {
            localStorage.setItem('salasDisponibles', JSON.stringify(salas));
            this.setState({salas: salas});
        });*/
    }

    subscribeNuevaSala = subscribeToMore => {
        subscribeToMore({
            document: NUEVA_SALA,
            updateQuery: (salasExistentes, {subscriptionDatos}) => {
                // if (!subscriptionDatos.data) return salasExistentes;
                console.log('datos', {subscriptionDatos})
            }
        })
    };

    accederSala = (sala) => {
        const esAdmin = this.props.history.location.pathname.includes('admin');
        const {usuario, usuarioAdmin} = this.state;

        if (esAdmin) {
            this.props.history.push({
                pathname: `/admin/sala/${sala.id}`,
                state: {sala: sala, usuarioAdmin: usuarioAdmin}
            })
        } else {
            this.props.history.push({
                pathname: `/usuario/sala/${sala.id}`,
                state: {sala: sala, usuario: usuario}
            })
        }
    };

    render() {
        return (
            <Query query={LISTAR_SALAS}>
                {({loading, error, data, subscribeToMore}) => {
                    if (loading) return <p>Cargando ...</p>;
                    if (error) return <p>Error ...</p>;

                    if (!unsubscribe) {
                        unsubscribe = subscribeToMore({
                            document: NUEVA_SALA,
                            updateQuery: (salasExistentes, {subscriptionDatos}) => {
                                if (!subscriptionDatos.data) return salasExistentes;
                                const {nuevaSala} = subscriptionDatos.data;
                                return {
                                    ...salasExistentes,
                                    LISTAR_SALAS: [...salasExistentes.findAllSalas, nuevaSala]
                                }
                                // console.log('datos', { subscriptionDatos })
                            }
                        })
                    }
                    // this.subscribeNuevaSala(subscribeToMore);
                    const salasDisponibles = data.findAllSalas;
                    const existenSalasDisponibles = salasDisponibles.length > 0;
                    return (
                        <div>
                            {
                                !existenSalasDisponibles ?
                                    <h2>No existen salas de reunión</h2> :
                                    <Row>
                                        <Col xs={3}></Col>
                                        <Col xs={6}>
                                            {salasDisponibles.map(sala => <Card key={sala.id}>
                                                <Card.Body>
                                                    <Card.Text>
                                                        {sala.nombre}
                                                    </Card.Text>
                                                    <Button type="primary" onClick={() => this.accederSala(sala)}>Ir a
                                                        sala</Button>
                                                </Card.Body>
                                            </Card>)}
                                        </Col>
                                        <Col xs={3}></Col>
                                    </Row>
                            }
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default ListarSalas;