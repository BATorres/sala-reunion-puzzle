import React, {Component} from 'react';
import io from "socket.io-client";

class ListarSalas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: this.props.location.state.usuario,
            salas: ''
        };

        const socket = io('http://localhost:8081');
        socket.on('salasDisponibles', (salas) => {
            console.log('salas', salas);
            this.setState({salas: salas});
        });
    }

    recibirSalas = () => {
        const socket = io('http://localhost:8081');
        socket.on('salasDisponibles', (salas) => {
            console.log('salas', salas);
            this.setState({salas: salas});
        });
    };

    render() {
        const {usuario, salas} = this.state;
        return (
            <div>
                {
                    !salas ?
                        <h2>No existen salas de reunión</h2> :
                        <ol>{salas.map(sala => <li>{sala.nombre}</li>)}</ol>
                }
            </div>
        )
    }
}

export default ListarSalas;