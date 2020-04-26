import React, {Component} from 'react';
import io from "socket.io-client";

class CrearSala extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sala: '',
            error: ''
        }
    }

    escucharCambiosFormulario = (evento) => {
        this.setState({sala: evento.target.value})
    };

    crearSala = (evento) => {
        const socket = io('http://localhost:8081');
        const {sala} = this.state;

        evento.preventDefault();
        socket.emit('verificarSala', sala, this.setearSala);
    };

    setearSala = ({ existeSala, sala }) => {
        if (existeSala) {
            this.setearError('La sala que desea crear ya existe');
        } else {
            this.setearError('');
            const socket = io('http://localhost:8081');
            socket.emit('crearSala', sala);
            /*this.props.history.push({
                pathname: '/admin/listar-salas'
            });*/
        }
    };

    setearError = (error) => {
        this.setState({error})
    };

    render() {
        const {sala, error} = this.state;
        return (
            <div id="login">
                <form id="formulario" onSubmit={this.crearSala}>
                    <label htmlFor="sala">
                        <h2>Ingrese el nombre de la sala</h2>
                    </label>
                    <input type="text"
                           id="sala"
                           value={sala}
                           placeholder={'Ingrese un nombre para la sala. EJ: Sala 1'}
                           onChange={this.escucharCambiosFormulario}
                    />
                    <div>{error ? error : null}</div>
                </form>
            </div>
        )
    }
}

export default CrearSala;