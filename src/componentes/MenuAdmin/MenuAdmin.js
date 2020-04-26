import React, {Component} from 'react';
import {Button, Container, Row} from "react-bootstrap";

class MenuAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: this.props.location.state.usuario
        };
    }

    render() {
        const {usuario} = this.state;
        return(
            <Container>
                <Row>
                    <Button variant="primary"
                            block
                            onClick={() => this.props.history.push({
                                pathname: '/admin/crear-sala',
                                state: { usuario: usuario }
                            })}
                    >
                        Crear sala
                    </Button>

                    <Button variant="info"
                            block
                            onClick={() => this.props.history.push({
                                pathname: '/admin/listar-salas',
                                state: { usuario: usuario }
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