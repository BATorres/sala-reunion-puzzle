import React, {Component} from 'react';
import * as go from "gojs";
import {Button, Col, Row} from "react-bootstrap";
import Paleta from "../../componentes/Paleta/Paleta";
import {FaLock, FaRegHandPaper, FaSatelliteDish} from "react-icons/fa";
import DiagramaEditable from "../../componentes/DiagramaEditable/DiagramaEditable";
import {diagramaEditable} from "../../componentes/DiagramaEditable/DiagramaEditable";
import {Query, graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {CAMBIOS_DIAGRAMA_USUARIO, CAMBIOS_USUARIO, NUEVO_USUARIO_SALA} from "../../constantes/subscriptors";
import {ACCIONES_USUARIO_SALA, GUARDAR_DIAGRAMA_USUARIO} from "../../constantes/mutations";
import {USUARIOS_EN_SALA} from "../../constantes/queries";

var datosCompartidos;

class PantallaInteractivaEditable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sala: this.props.match.params,
            usuarioAdmin: localStorage.getItem('usuarioAdmin'),
            usuario: localStorage.getItem('usuario'),
            guardar: ''
        };
    }

    subscribeNuevoUsuarioSala = subscribeToMore => {
        subscribeToMore({
            document: NUEVO_USUARIO_SALA,
            updateQuery: (usuariosEnSala, {subscriptionData}) => {
                if (!subscriptionData.data) return usuariosEnSala.findAllUsuariosEnSala;
                const datosSubscription = subscriptionData.data.usuarioSala.node;
                const nuevoUsuarioEnSala = {usuario: datosSubscription.usuario};
                const existeNuevoUsuarioEnSala = usuariosEnSala.findAllUsuariosEnSala.map(usuarios => usuarios.usuario)
                    .find(
                        ({id}) => id === nuevoUsuarioEnSala.usuario.id
                    );
                if (existeNuevoUsuarioEnSala && datosSubscription.sala.id === this.state.sala.idSala) return usuariosEnSala.findAllUsuariosEnSala;
                return Object.assign({}, usuariosEnSala, {
                    findAllUsuariosEnSala: [datosSubscription, ...usuariosEnSala.findAllUsuariosEnSala]
                });
            }
        })
    };

    subscribeCambioUsuario = subscribeToMore => {
        subscribeToMore({
            document: CAMBIOS_USUARIO,
            updateQuery: (usuariosEnSala, {subscriptionData}) => {
                if (!subscriptionData.data) return usuariosEnSala.findAllUsuariosEnSala;
                const datosSubscription = subscriptionData.data.usuarioSala.node;
                const usuarioPidioLaPalabra = usuariosEnSala.findAllUsuariosEnSala
                    .findIndex(
                        ({id}) => id === datosSubscription.id
                    );
                if (usuarioPidioLaPalabra && datosSubscription.sala.id === this.state.sala.idSala) return usuariosEnSala.findAllUsuariosEnSala;
                let nuevoArreglo = [...usuariosEnSala.findAllUsuariosEnSala];
                nuevoArreglo[usuarioPidioLaPalabra] = datosSubscription;
                return Object.assign({}, nuevoArreglo, {
                    findAllUsuariosEnSala: [...nuevoArreglo]
                });
            }
        })
    };

    subscribeCambiosDiagramaUsuario = subscribeToMore => {
        subscribeToMore({
            document: CAMBIOS_DIAGRAMA_USUARIO,
            updateQuery: (usuariosEnSala, {subscriptionData}) => {
                datosCompartidos = subscriptionData.data.diagrama.node;
            }
        })
    };

    pedirLaPalabra = () => {
        this.props.accionesUsuarioSala({
            variables: {
                idSala: this.state.sala.idSala,
                idUsuario: localStorage.getItem('usuario'),
                tipoAccion: 'Pedir la palabra'
            }
        })
    };

    compartirPantalla = () => {
        this.props.accionesUsuarioSala({
            variables: {
                idSala: this.state.sala.idSala,
                idUsuario: localStorage.getItem('usuario'),
                tipoAccion: 'Compartir pantalla'
            }
        });

        const datosAGuardar = diagramaEditable.model.toJson();

        this.props.guardarDiagramaUsuario({
            variables: {
                idSala: this.state.sala.idSala,
                idUsuario: localStorage.getItem('usuario'),
                datos: JSON.stringify(datosAGuardar)
            }
        })
    };

    cargarDatosCompartidos = (usuario) => {
        const lleganDatosCompartidos = datosCompartidos !== undefined;

        if (lleganDatosCompartidos) {
            const diagramaUsuario = datosCompartidos.diagramasPorUsuario[0];

            const usuarioTieneDiagramaEnSala =
                usuario.usuario.id === diagramaUsuario.usuario.id &&
                usuario.sala.id === diagramaUsuario.sala.id;

            if (usuarioTieneDiagramaEnSala) {
                diagramaEditable.model = go.Model.fromJson(JSON.parse(datosCompartidos.datos));
            }
        }
    };

    render() {
        const esAdmin = this.props.history.location.pathname.includes('admin');
        return (
            <div id="contenedor">
                <div id="area-paleta">
                    <Paleta/>
                    {!esAdmin ?
                        <Row>
                            <Button
                                variant="success"
                                onClick={this.pedirLaPalabra}>
                                Pedir la palabra
                            </Button>

                            <Button
                                variant="info"
                                onClick={this.compartirPantalla}>
                                Compartir
                            </Button>
                        </Row> : (
                            <Query query={USUARIOS_EN_SALA}>
                                {({loading, error, data, subscribeToMore}) => {
                                    if (loading) return <p>Cargando ...</p>;
                                    if (error) return <p>Error ...</p>;

                                    this.subscribeNuevoUsuarioSala(subscribeToMore, {variables: {id: this.state.sala}});
                                    this.subscribeCambioUsuario(subscribeToMore, {variables: {id: this.state.sala}});
                                    this.subscribeCambiosDiagramaUsuario(subscribeToMore);

                                    const usuariosEnSala = data.findAllUsuariosEnSala.filter(salas => salas.sala.id === this.state.sala.idSala);
                                    const existenUsuariosEnSala = usuariosEnSala.length > 0;

                                    return (
                                        <div>
                                            {
                                                !existenUsuariosEnSala ?
                                                    <h2>No existen usuarios en sala</h2> :
                                                    <Row>
                                                        {usuariosEnSala.map(
                                                            (usuarios, indice) =>
                                                                <Button key={indice}
                                                                        disabled={!usuarios.compartirPantalla}
                                                                        onClick={
                                                                            () => this.cargarDatosCompartidos(usuarios)
                                                                        }
                                                                >
                                                                    {
                                                                        usuarios.compartirPantalla
                                                                            ? <FaSatelliteDish/>
                                                                            : (
                                                                                !usuarios.levantarMano
                                                                                    ? <FaLock/> :
                                                                                    <FaRegHandPaper/>
                                                                            )
                                                                    }
                                                                    {usuarios.usuario.nombre}
                                                                </Button>
                                                        )}
                                                    </Row>
                                            }
                                        </div>
                                    )
                                }}
                            </Query>)
                    }
                </div>
                <Col id="diagrama">
                    <DiagramaEditable
                        sala={this.state.sala}
                        usuario={this.state.usuario}
                        guardar={this.state.guardar}
                    />
                </Col>
            </div>
        );
    }
}

export default compose(
    graphql(
        ACCIONES_USUARIO_SALA,
        {
            name: 'accionesUsuarioSala'
        }
    ),
    graphql(
        GUARDAR_DIAGRAMA_USUARIO,
        {
            name: 'guardarDiagramaUsuario'
        }
    )
)
(PantallaInteractivaEditable);
