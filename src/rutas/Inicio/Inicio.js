import React, {Component} from 'react';
import {Button, Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {FaTrash, FaUser, FaUserCog} from "react-icons/fa";

class Inicio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: localStorage.getItem('usuario'),
            usuarioAdmin: localStorage.getItem('usuarioAdmin')
        }
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Button
                            variant="outline-dark"
                            block
                            onClick={() => {
                                if (this.state.usuarioAdmin) {
                                    this.props.history.push('/admin/menu')
                                } else {
                                    this.props.history.push('/admin/login')
                                }
                            }}
                        >
                            <div className="react-icons">
                                <FaUserCog/>
                            </div>
                            Soy admin
                        </Button>
                    </Col>

                    <Col>
                        <Button
                            variant="outline-dark"
                            block
                            onClick={() => {
                                if (this.state.usuario) {
                                    this.props.history.push('/usuario/listar-salas')
                                } else {
                                    this.props.history.push('/usuario/login')
                                }
                            }}
                        >
                            <div className="react-icons">
                                <FaUser/>
                            </div>
                            Soy usuario
                        </Button>
                    </Col>

                    <Col>
                        <Button
                            variant="outline-danger"
                            block
                            onClick={() => {
                                localStorage.clear();
                            }}
                        >
                            <div className="react-icons">
                                <FaTrash/>
                            </div>
                            Limpiar local storage
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Inicio;