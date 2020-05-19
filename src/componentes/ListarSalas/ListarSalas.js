import React, {Component} from 'react';
import io from "socket.io-client";
import {Container, Button, Col, Row, Card} from "react-bootstrap";

class ListarSalas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: localStorage.getItem('usuario'),
            usuarioAdmin: localStorage.getItem('usuarioAdmin'),
            salas: JSON.parse(localStorage.getItem('salasDisponibles'))
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
                state: { sala: sala, usuarioAdmin: usuarioAdmin }
            })
        } else {
            this.props.history.push({
                pathname: `/usuario/sala/${sala.id}`, 
                state: { sala: sala, usuario: usuario }
            })
        }
    };

    render() {
        const {salas} = this.state;
        return (
            <div>
                {
                    !salas ?
                        <h2>No existen salas de reunión</h2> :
                        <Row>
                            <Col xs={3}></Col>
                            <Col xs={6}>
                                {salas.map(sala => <Card key={sala.id}>
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