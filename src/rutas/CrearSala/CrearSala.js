import React, {Component} from 'react';
import io from "socket.io-client";
import gql from "graphql-tag";
import {Mutation} from 'react-apollo';

const CREAR_SALA = gql`
    mutation CrearSala($nombre: String!) {
        crearSala(nombre: $nombre) {
            nombre
        }
    }`;

class CrearSala extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuarioAdmin: localStorage.getItem('usuarioAdmin'),
            sala: '',
            error: ''
        }
    }

    escucharCambiosFormulario = (evento) => {
        this.setState({sala: evento.target.value})
    };

    crearSala = (evento) => {
        // const socket = io('/');
        const {sala} = this.state;

        evento.preventDefault();
        // socket.emit('verificarSala', sala, this.setearSala);
    };

    setearSala = ({existeSala, sala}) => {
        const {usuario} = this.state;
        if (existeSala) {
            this.setearError('La sala que desea crear ya existe');
        } else {
            this.setearError('');
            /*const socket = io('/');
            socket.emit('crearSala', sala);*/
            this.props.history.push({
                pathname: '/admin/listar-salas',
                state: {usuario: usuario}
            });
        }
    };

    setearError = (error) => {
        this.setState({error})
    };

    render() {
        const {sala, error} = this.state;
        return (
            <div id="login">
                <Mutation mutation={CREAR_SALA}>
                    {(crearSala, {data}) => (
                        <form id="formulario" onSubmit={
                            evento => {
                                const {usuario} = this.state;
                                evento.preventDefault();
                                crearSala({variables: {nombre: sala}});
                                this.props.history.push({
                                    pathname: '/admin/listar-salas',
                                    state: {usuarioAdmin: usuario}
                                });
                            }
                        }>
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
                    )}
                </Mutation>
            </div>
        )
    }
}

export default CrearSala;