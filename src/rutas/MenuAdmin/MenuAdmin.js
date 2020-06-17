import React, {Component} from 'react';
import {Button, Container, Row, Col} from "react-bootstrap";
import BreadcrumbItem from "react-bootstrap/BreadcrumbItem";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {FaListAlt, FaProjectDiagram} from "react-icons/fa";

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
                        <Button variant="outline-primary"
                                block
                                onClick={() => this.props.history.push({
                                    pathname: '/admin/crear-sala'
                                })}
                        >
                            <div className="react-icons">
                                <FaProjectDiagram/>
                            </div>
                            Crear sala
                        </Button>
                    </Col>

                    <Col>
                        <Button variant="outline-primary"
                                block
                                onClick={() => this.props.history.push({
                                    pathname: '/admin/listar-salas'
                                })}
                        >
                            <div className="react-icons">
                                <FaListAlt/>
                            </div>
                            Ver salas
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MenuAdmin;