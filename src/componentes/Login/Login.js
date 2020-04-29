import React, {Component} from 'react';
import io from "socket.io-client";

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
        const socket = io('http://localhost:8081');
        const {usuario} = this.state;

        evento.preventDefault();
        // socket.emit('verificarUsuario', usuario, this.setearUsuario)
        const esAdmin = this.props.history.location.pathname.includes('admin');
        this.setearError('');

        socket.emit('agregarUsuario', usuario);

        if (esAdmin) {
            this.props.history.push({
                pathname: '/admin/menu',
                state: {usuarioAdmin: usuario}
            });
            localStorage.setItem('usuarioAdmin', usuario);
        } else {
            this.props.history.push({
                pathname: '/usuario/listar-salas',
                state: { usuario: usuario}
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
            const socket = io('http://localhost:8081');
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
                <form id="formulario" onSubmit={this.ingresar}>
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
            </div>
        )
    }
}

export default Login;