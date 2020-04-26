import React, {Component} from 'react';
import {Button, Container, Row} from "react-bootstrap";

class Inicio extends Component {
    render() {
        return(
            <Container>
                <Row>
                    <Button variant="primary"
                            block
                            onClick={() => this.props.history.push('/admin/login')}
                    >
                        Soy admin
                    </Button>

                    <Button variant="info"
                            block
                            onClick={() => this.props.history.push('/usuario/login')}
                    >
                        Soy usuario
                    </Button>
                </Row>
            </Container>
        )
    }
}

export default Inicio;