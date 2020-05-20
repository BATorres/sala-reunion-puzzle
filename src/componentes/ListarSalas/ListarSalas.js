import React, {Component} from 'react';
import io from "socket.io-client";
import {Container, Button, Col, Row, Card} from "react-bootstrap";
import {Query} from 'react-apollo';
import gql from "graphql-tag";

const LISTAR_SALAS = gql`
    query {
        findAllSalas {
            id
            nombre
        }
    }`;

class ListarSalas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: localStorage.getItem('usuario'),
            usuarioAdmin: localStorage.getItem('usuarioAdmin'),
        };

        const socket = io('/');
        socket.on('salasDisponibles', (salas) => {
            localStorage.setItem('salasDisponibles', JSON.stringify(salas));
            this.setState({salas: salas});
        });
    }

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
                {({loading, error, data}) => {
                    if (loading) return <p>Cargando ...</p>;
                    if (error) return <p>Error ...</p>;

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