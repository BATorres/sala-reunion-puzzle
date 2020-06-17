import React, {Component} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import {Query, graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {NUEVA_SALA} from "../../constantes/subscriptors";
import {LISTAR_SALAS} from "../../constantes/queries";
import {UNIRSE_SALA} from "../../constantes/mutations";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import BreadcrumbItem from "react-bootstrap/BreadcrumbItem";
import Spinner from "react-bootstrap/Spinner";

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

            this.props.unirseSala({
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
                    if (loading) return <Spinner id="spinner" animation="border"/>;
                    if (error) return <p>Error ...</p>;

                    this.subscribeNuevaSala(subscribeToMore);

                    const salasAMostrar = data.findAllSalas;
                    const existenSalasDisponibles = salasAMostrar.length > 0;
                    const esAdmin = this.props.history.location.pathname.includes('admin');

                    return (
                        <div>
                            {
                                !existenSalasDisponibles ?
                                    <h2>No existen salas de reunión</h2> :
                                    <Container fluid>
                                        <Breadcrumb>
                                            <BreadcrumbItem href="/">
                                                Inicio
                                            </BreadcrumbItem>

                                            {esAdmin ?
                                                <BreadcrumbItem href={window.location.protocol + '//' + window.location.host + '/admin/menu'}>
                                                    Menú
                                                </BreadcrumbItem> : ''
                                            }

                                            <BreadcrumbItem active>
                                                Lista de salas
                                            </BreadcrumbItem>
                                        </Breadcrumb>

                                        <Row>
                                            {salasAMostrar.map(sala => <Col xs={2}>
                                                <Card key={sala.id}>
                                                    <Card.Body>
                                                        <Card.Title className="card-title">
                                                            {sala.nombre}
                                                        </Card.Title>

                                                        <Card.Img src={require('../../assets/imagenes/project.svg')}/>

                                                        <Button
                                                            type="primary"
                                                            block
                                                            onClick={
                                                                () => this.accederSala(sala)
                                                            }>Ir a sala
                                                        </Button>
                                                    </Card.Body>
                                                </Card>
                                            </Col>)}
                                        </Row>
                                    </Container>
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
        UNIRSE_SALA,
        {
            name: 'unirseSala'
        }
    )
)
(ListarSalas);
