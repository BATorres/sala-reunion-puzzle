import React, {Component} from 'react';
import * as go from "gojs";
import {Button, Col, Row, Tab, Tabs} from "react-bootstrap";
import Paleta from "../../componentes/Paleta/Paleta";
import {FaLock, FaRegHandPaper, FaSatelliteDish} from "react-icons/fa";
import DiagramaEditable from "../../componentes/DiagramaEditable/DiagramaEditable";
import {diagramaEditable} from "../../componentes/DiagramaEditable/DiagramaEditable";
import {Query, graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {CAMBIOS_DIAGRAMA_USUARIO, CAMBIOS_USUARIO, NUEVO_USUARIO_SALA} from "../../constantes/subscriptors";
import {ACCIONES_USUARIO_SALA, GUARDAR_DIAGRAMA_USUARIO} from "../../constantes/mutations";
import {USUARIOS_EN_SALA, VERIFICAR_DIAGRAMA_USUARIO} from "../../constantes/queries";
import {makeStyles} from '@material-ui/core/styles';
import Container from "react-bootstrap/Container";
import BreadcrumbItem from "react-bootstrap/BreadcrumbItem";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import DiagramaGlobal, {diagramaGlobal} from "../../componentes/DiagramaGlobal/DiagramaGlobal";

var datosCompartidos;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

class SalaReunion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sala: this.props.match.params,
            usuarioAdmin: localStorage.getItem('usuarioAdmin'),
            usuario: localStorage.getItem('usuario'),
            llaveSeleccionada: 'diagramaEditable'
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
                diagramaGlobal.model = go.Model.fromJson(JSON.parse(datosCompartidos.datos));
            }
        }
    };

    render() {
        const esAdmin = this.props.history.location.pathname.includes('admin');
        const sala = this.state.sala;

        return (
            <Container fluid>
                <Breadcrumb>
                    <BreadcrumbItem href="/">
                        Inicio
                    </BreadcrumbItem>

                    {esAdmin ?
                        <BreadcrumbItem href="/admin/menu">
                            Menú
                        </BreadcrumbItem> : ''
                    }

                    {esAdmin ?
                        <BreadcrumbItem href="/admin/listar-salas">
                            Lista de salas
                        </BreadcrumbItem> :
                        <BreadcrumbItem href="/usuario/listar-salas">
                            Lista de salas
                        </BreadcrumbItem>
                    }

                    <BreadcrumbItem active>
                        {sala.idSala}
                    </BreadcrumbItem>
                </Breadcrumb>

                <Row>
                    {!esAdmin ?
                        <Container fluid>
                            <Row>
                                <Col xs={2}>
                                    <Paleta/>
                                </Col>

                                <Col xs={10}>
                                    <DiagramaEditable/>
                                </Col>
                            </Row>
                        </Container> :
                        <Container fluid>
                            <Row>
                                <Col>
                                    <DiagramaGlobal/>
                                </Col>
                            </Row>
                        </Container>
                    }

                    {!esAdmin ?
                        <Container fluid>
                            <Row>
                                <Col xs={1}>
                                    <Button
                                        variant="success"
                                        onClick={this.pedirLaPalabra}>
                                        Pedir la palabra
                                    </Button>
                                </Col>

                                <Col xs={1}>
                                    <Button
                                        variant="info"
                                        onClick={this.compartirPantalla}>
                                        Compartir
                                    </Button>
                                </Col>
                            </Row>
                        </Container> : (
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
                                                    <Container>
                                                        <Row>
                                                            {usuariosEnSala.map(
                                                                (usuarios, indice) =>
                                                                    <Col>
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
                                                                    </Col>
                                                            )}
                                                        </Row>
                                                    </Container>
                                            }
                                        </div>
                                    )
                                }}
                            </Query>)
                    }
                </Row>
            </Container>
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
(SalaReunion);
