import React, {Component} from 'react';
import {Query, Mutation} from 'react-apollo';
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";

const CREAR_USUARIO = gql`
    mutation CrearUsuario($nombre: String!, $esAdmin: Boolean) {
        crearUsuario(nombre: $nombre, esAdmin: $esAdmin) {
            id
            nombre
        }
    }`;

const LISTAR_USUARIOS = gql`
    query ListarUsuarios($idUsuario: ID) {
        findAllUsuarios(idUsuario: $idUsuario) {
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
        const {usuario} = this.state;

        evento.preventDefault();

        const esAdmin = this.props.history.location.pathname.includes('admin');
        this.setearError('');

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

    verificarUsuario = ({usuario}) => {
        const {loading, error, data} = useQuery(LISTAR_USUARIOS);
        console.log('data', data)
    };

    setearError = (error) => {
        this.setState({error})
    };

    render() {
        const {usuario, error} = this.state;

        return (
            <div id="login">
                <Mutation mutation={CREAR_USUARIO}
                          update={(proxy, mutationResult) => {
                              const usuarioCreado = mutationResult.data.crearUsuario.id;
                              const esAdmin = this.props.history.location.pathname.includes('admin');
                              this.setearError('');

                              if (esAdmin) {
                                  localStorage.setItem('usuarioAdmin', usuarioCreado);
                              } else {
                                  localStorage.setItem('usuario', usuarioCreado);
                              }

                          }}
                          onError={(mutationError) => {
                              const error = mutationError.graphQLErrors[0].message;
                              this.setearError(error)
                          }}
                >
                    {(crearUsuario) => (
                        <form id="formulario" onSubmit={
                            evento => {
                                evento.preventDefault();

                                const esAdmin = this.props.history.location.pathname.includes('admin');

                                if (esAdmin) {
                                    this.props.history.push({
                                        pathname: '/admin/menu',
                                        state: {usuarioAdmin: usuario}
                                    });
                                    crearUsuario({variables: {nombre: usuario, esAdmin: true}});
                                    // localStorage.setItem('usuarioAdmin', usuario);
                                } else {
                                    this.props.history.push({
                                        pathname: '/usuario/listar-salas',
                                        state: {usuario: usuario}
                                    });
                                    crearUsuario({variables: {nombre: usuario}});
                                    // localStorage.setItem('usuario', usuario);
                                }
                                /*if (existeError) {
                                    this.setearError(error);
                                } else {
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
                                }*/
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