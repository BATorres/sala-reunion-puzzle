import React, {Component} from 'react';
import {Button, Container, Row} from "react-bootstrap";

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
            <Container>
                <Row>
                    <Button variant="primary"
                            block
                            onClick={() => this.props.history.push({
                                pathname: '/admin/crear-sala'
                            })}
                    >
                        Crear sala
                    </Button>

                    <Button variant="info"
                            block
                            onClick={() => this.props.history.push({
                                pathname: '/admin/listar-salas'
                            })}
                    >
                        Ver salas
                    </Button>
                </Row>
            </Container>
        )
    }
}

export default MenuAdmin;