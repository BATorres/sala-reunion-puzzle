import React, {Component} from 'react';
import io from "socket.io-client";
import {Mutation} from 'react-apollo';
import gql from "graphql-tag";

const CREAR_USUARIO = gql`
    mutation CrearUsuario($nombre: String!, $esAdmin: Boolean) {
        crearUsuario(nombre: $nombre, esAdmin: $esAdmin) {
            id
            nombre
        }
    }`;

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: '',
            usuarioAdmin: '',
            error: ''
        }
    }

    escucharCambiosFormulario = (evento) => {
        this.setState({usuario: evento.target.value})
    };

    ingresar = (evento) => {
        // const socket = io('/');
        const {usuario} = this.state;

        evento.preventDefault();
        // socket.emit('verificarUsuario', usuario, this.setearUsuario)
        const esAdmin = this.props.history.location.pathname.includes('admin');
        this.setearError('');

        // socket.emit('agregarUsuario', usuario);

        if (esAdmin) {
            this.props.history.push({
                pathname: '/admin/menu',
                state: {usuarioAdmin: usuario}
            });
            localStorage.setItem('usuarioAdmin', usuario);
        } else {
            this.props.history.push({
                pathname: '/usuario/listar-salas',
                state: {usuario: usuario}
            });
            localStorage.setItem('usuario', usuario);
        }

    };

    setearUsuario = ({usuario, esUsuario}) => {
        if (esUsuario) {
            this.setearError('El nombre de usuario ya existe');
        } else {
            const esAdmin = this.props.history.location.pathname.includes('admin');
            this.setearError('');
            const socket = io('/');
            socket.emit('agregarUsuario', usuario);

            if (esAdmin) {
                this.props.history.push({
                    pathname: '/admin/menu',
                    state: {usuario: usuario}
                })
            } else {
                this.props.history.push({
                    pathname: '/usuario/listar-salas',
                    state: {usuario: usuario}
                })
            }
        }
    };

    setearError = (error) => {
        this.setState({error})
    };

    render() {
        const {usuario, error} = this.state;
        return (
            <div id="login">
                <Mutation mutation={CREAR_USUARIO}>
                    {(crearUsuario, {data}) => (
                        <form id="formulario" onSubmit={
                            evento => {
                                evento.preventDefault();
                                const esAdmin = this.props.history.location.pathname.includes('admin');
                                this.setearError('');

                                if (esAdmin) {
                                    this.props.history.push({
                                        pathname: '/admin/menu',
                                        state: {usuarioAdmin: usuario}
                                    });
                                    crearUsuario({variables: {nombre: usuario, esAdmin: true}});
                                    localStorage.setItem('usuarioAdmin', usuario);
                                } else {
                                    this.props.history.push({
                                        pathname: '/usuario/listar-salas',
                                        state: {usuario: usuario}
                                    });
                                    crearUsuario({variables: {nombre: usuario}});
                                    localStorage.setItem('usuario', usuario);
                                }
                            }
                        }>
                            <label htmlFor="usuario">
                                <h2>Ingrese su nombre de usuario</h2>
                            </label>
                            <input type="text"
                                   id="usuario"
                                   value={usuario}
                                   placeholder={'Ingrese usu nombre de usuario. EJ: Edison'}
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

export default Login;