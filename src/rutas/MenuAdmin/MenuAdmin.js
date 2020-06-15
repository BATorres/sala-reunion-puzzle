import React, {Component} from 'react';
import {Button, Container, Row, Col} from "react-bootstrap";
import BreadcrumbItem from "react-bootstrap/BreadcrumbItem";
import Breadcrumb from "react-bootstrap/Breadcrumb";

class MenuAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuarioAdmin: localStorage.getItem('usuarioAdmin'),
            usuario: localStorage.getItem('usuario')
        };
    }

    render() {
        return(
            <Container fluid>
                <Breadcrumb>
                    <BreadcrumbItem href="/">
                        Inicio
                    </BreadcrumbItem>

                    <BreadcrumbItem active>
                        Menú
                    </BreadcrumbItem>
                </Breadcrumb>

                <Row>
                    <Col>
                        <Button variant="primary"
                                block
                                onClick={() => this.props.history.push({
                                    pathname: '/admin/crear-sala'
                                })}
                        >
                            Crear sala
                        </Button>
                    </Col>

                    <Col>
                        <Button variant="info"
                                block
                                onClick={() => this.props.history.push({
                                    pathname: '/admin/listar-salas'
                                })}
                        >
                            Ver salas
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MenuAdmin;