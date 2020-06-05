import React, {Component} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import {Mutation, Query, graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {NUEVA_SALA} from "../../constantes/subscriptors";
import {LISTAR_SALAS} from "../../constantes/queries";
import {UNIRSE_SALA} from "../../constantes/mutations";

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
    graphql(UNIRSE_SALA)
)
(ListarSalas);
