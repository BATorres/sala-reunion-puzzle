import React, {Component} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import {Mutation, Query, graphql} from 'react-apollo';
import gql from "graphql-tag";
import {flowRight as compose} from 'lodash';

const LISTAR_SALAS = gql`
    query {
        findAllSalas {
            id
            nombre
        }
    }`;

const NUEVA_SALA = gql`
    subscription {
        sala {
            node {
                id
                nombre
            }
        }
    }`;

const UNIRSE_SALA = gql`
    mutation UnirseSala($idSala: ID!, $idUsuario: ID!) {
        unirseSala(idSala: $idSala, idUsuario: $idUsuario) {
            id
        }
    }`;

const BUSCAR_USUARIO = gql`
    query BuscarUsuario($idUsuario: ID) {
        findOneUsuario(idUsuario: $idUsuario) {
            usuariosEnSala {
                sala {
                    id
                    nombre
                }
            }
        }
    }`;

class ListarSalas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: localStorage.getItem('usuario'),
            usuarioAdmin: localStorage.getItem('usuarioAdmin'),
        };
    }

    subscribeNuevaSala = subscribeToMore => {
        subscribeToMore({
            document: NUEVA_SALA,
            updateQuery: (salasExistentes, {subscriptionData}) => {
                if (!subscriptionData.data) return salasExistentes.findAllSalas;
                const nuevaSala = subscriptionData.data.sala.node;
                const existeNuevaSala = salasExistentes.findAllSalas
                    .find(
                        ({id}) => id === nuevaSala.id
                    );
                if (existeNuevaSala) return salasExistentes.findAllSalas;
                return Object.assign({}, salasExistentes, {
                    findAllSalas: [nuevaSala, ...salasExistentes.findAllSalas]
                });
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
            const salasDeUsuario = this.props.buscarUsuario.findOneUsuario.usuariosEnSala;
            if (salasDeUsuario.length > 0) {
                const seUnioSala = salasDeUsuario
                    .map(
                        salas => salas.sala
                    ).some(
                        salaUsuario => salaUsuario.id === sala.id
                    );

                if (seUnioSala) {
                    this.props.history.push({
                        pathname: `/usuario/sala/${sala.id}`,
                        state: {sala: sala, usuario: usuario}
                    });
                }

                if (salasDeUsuario.length !== 0 && !seUnioSala) {
                    this.props.history.push({
                        pathname: `/usuario/sala/${sala.id}`,
                        state: {sala: sala, usuario: usuario}
                    });

                    this.props.mutate({
                        variables: {
                            idSala: sala.id,
                            idUsuario: localStorage.getItem('usuario')
                        }
                    });
                }
            } else {
                this.props.history.push({
                    pathname: `/usuario/sala/${sala.id}`,
                    state: {sala: sala, usuario: usuario}
                });

                this.props.mutate({
                    variables: {
                        idSala: sala.id,
                        idUsuario: localStorage.getItem('usuario')
                    }
                });
            }
        }
    };

    render() {
        return (
            <Query query={LISTAR_SALAS}>
                {({loading, error, data, subscribeToMore}) => {
                    if (loading) return <p>Cargando ...</p>;
                    if (error) return <p>Error ...</p>;

                    this.subscribeNuevaSala(subscribeToMore);

                    const salasAMostrar = data.findAllSalas;
                    const existenSalasDisponibles = salasAMostrar.length > 0;

                    return (
                        <div>
                            {
                                !existenSalasDisponibles ?
                                    <h2>No existen salas de reunión</h2> :
                                    <Row>
                                        <Col xs={3}></Col>
                                        <Col xs={6}>
                                            {salasAMostrar.map(sala => <Card key={sala.id}>
                                                <Card.Body>
                                                    <Card.Text>
                                                        {sala.nombre}
                                                    </Card.Text>
                                                    <Button
                                                        type="primary"
                                                        onClick={() => this.accederSala(sala)
                                                        }>Ir a
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

export default compose(
    graphql(
        BUSCAR_USUARIO,
        {
            name: 'buscarUsuario',
            options: {
                variables: {
                    idUsuario: localStorage.getItem('usuario')
                }
            }
        }),
    graphql(UNIRSE_SALA)
)
(ListarSalas);
