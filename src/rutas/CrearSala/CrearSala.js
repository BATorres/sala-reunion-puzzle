import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import {CREAR_SALA} from "../../constantes/mutations";

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
        evento.preventDefault();
    };

    setearSala = ({existeSala, sala}) => {
        const {usuario} = this.state;
        if (existeSala) {
            this.setearError('La sala que desea crear ya existe');
        } else {
            this.setearError('');
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