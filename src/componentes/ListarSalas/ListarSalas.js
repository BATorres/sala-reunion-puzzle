import React, {Component} from 'react';
import io from "socket.io-client";
import {Container, Button, Col, Row, Card} from "react-bootstrap";

class ListarSalas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: this.props.location.state.usuario,
            salas: ''
        };

        const socket = io('/');
        socket.on('salasDisponibles', (salas) => {
                    console.log('salas', salas);
            this.setState({salas: salas});
        });
    }

    accederSala = (sala) => {
        const esAdmin = this.props.history.location.pathname.includes('admin');
        const {usuario} = this.state;

        if (esAdmin) {
            this.props.history.push({
                pathname: `/admin/sala/${sala.id}`, 
                state: { sala: sala, usuario: usuario }
            })
        } else {
            this.props.history.push({
                pathname: `/usuario/sala/${sala.id}`, 
                state: { sala: sala, usuario: usuario }
            })
        }
    };


    render() {
        const {usuario, salas, idSala} = this.state;
        return (
            <div>
                {
                    !salas ?
                        <h2>No existen salas de reunión</h2> :
                        <Row>
                            <Col xs={3}></Col>
                            <Col xs={3}>
                                {salas.map(sala => <Card>
                                    <Card.Body>
                                        <Card.Text>
                                            {sala.nombre}
                                        </Card.Text>
                                        <Button type="primary" onClick={() => this.accederSala(sala)}>Ir a sala</Button>
                                    </Card.Body>
                                </Card>)}  
                            </Col>
                            <Col xs={3}></Col>
                        </Row>
                }
            </div>
        )
    }
}

export default ListarSalas;