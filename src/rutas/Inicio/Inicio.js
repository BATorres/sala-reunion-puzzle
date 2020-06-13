import React, {Component} from 'react';
import {Button, Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";

class Inicio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: localStorage.getItem('usuario'),
            usuarioAdmin: localStorage.getItem('usuarioAdmin')
        }
    }

    render() {
        return(
            <Container fluid>
                <Row>
                    <Col>
                        <Button variant="primary"
                                block
                                onClick={() => {
                                    if (this.state.usuarioAdmin) {
                                        this.props.history.push('/admin/menu')
                                    } else {
                                        this.props.history.push('/admin/login')
                                    }
                                }}
                        >
                            Soy admin
                        </Button>
                    </Col>

                    <Col>
                        <Button variant="info"
                                block
                                onClick={() => {
                                    if (this.state.usuario) {
                                        this.props.history.push('/usuario/listar-salas')
                                    } else {
                                        this.props.history.push('/usuario/login')
                                    }
                                }}
                        >
                            Soy usuario
                        </Button>
                    </Col>

                    <Col>
                        <Button variant="danger"
                                block
                                onClick={() => {
                                    localStorage.clear();
                                }}
                        >
                            Limpiar local storage
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Inicio;