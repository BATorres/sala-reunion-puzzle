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
import {USUARIOS_EN_SALA} from "../../constantes/queries";
import Container from "react-bootstrap/Container";
import BreadcrumbItem from "react-bootstrap/BreadcrumbItem";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import DiagramaGlobal, {diagramaGlobal} from "../../componentes/DiagramaGlobal/DiagramaGlobal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {MdScreenShare} from "react-icons/md";
import Spinner from "react-bootstrap/Spinner";
import {TabPanel, TabView} from "primereact/tabview";

var datosCompartidos;

class SalaReunion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sala: this.props.location.state.sala,
            usuarioAdmin: localStorage.getItem('usuarioAdmin'),
            usuario: localStorage.getItem('usuario'),
            llaveSeleccionada: 'diagramaEditable',
        };
    }

    componentDidMount() {
        const existenDiagramasEnSala = this.state.sala.diagramasPorUsuario.length > 0;
        if (existenDiagramasEnSala) {
            const datosDiagramaExistentes = this.state.sala.diagramasPorUsuario
                .filter(
                    (diagramaPorUsuario) => {
                        return diagramaPorUsuario.sala.id === this.state.sala.id && diagramaPorUsuario.usuario.id === localStorage.getItem('usuario')
                    }
                );
            const esUsuarioYTieneDiagramaSala = this.props.history.location.pathname.includes('usuario') && datosDiagramaExistentes.length > 0;
            if (esUsuarioYTieneDiagramaSala) {
                const datosACargar = datosDiagramaExistentes[0].diagrama.datos;
                diagramaEditable.model = go.Model.fromJson(JSON.parse(datosACargar));
            }
        }
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
                if (existeNuevoUsuarioEnSala && datosSubscription.sala.id === this.state.sala.id) return usuariosEnSala.findAllUsuariosEnSala;
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
                if (usuarioPidioLaPalabra && datosSubscription.sala.id === this.state.sala.id) return usuariosEnSala.findAllUsuariosEnSala;
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
                idSala: this.state.sala.id,
                idUsuario: localStorage.getItem('usuario'),
                tipoAccion: 'Pedir la palabra'
            }
        })
    };

    compartirPantalla = () => {
        this.props.accionesUsuarioSala({
            variables: {
                idSala: this.state.sala.id,
                idUsuario: localStorage.getItem('usuario'),
                tipoAccion: 'Compartir pantalla'
            }
        });

        const datosAGuardar = diagramaEditable.model.toJson();

        this.props.guardarDiagramaUsuario({
            variables: {
                idSala: this.state.sala.id,
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
                        <BreadcrumbItem href={window.location.protocol + '//' + window.location.host + '/admin/menu'}>
                            Menú
                        </BreadcrumbItem> : ''
                    }

                    {esAdmin ?
                        <BreadcrumbItem
                            href={window.location.protocol + '//' + window.location.host + '/admin/listar-salas'}>
                            Lista de salas
                        </BreadcrumbItem> :
                        <BreadcrumbItem
                            href={window.location.protocol + '//' + window.location.host + '/usuario/listar-salas'}>
                            Lista de salas
                        </BreadcrumbItem>
                    }

                    <BreadcrumbItem active>
                        {sala.nombre}
                    </BreadcrumbItem>
                </Breadcrumb>

                <Row>
                    {!esAdmin ?
                        <Container fluid>
                            <Row>
                                <Col xs={2}>
                                    <Row>
                                        <Col>
                                            <Paleta/>
                                            <OverlayTrigger
                                                placement="right"
                                                overlay={
                                                    <Tooltip id="tooltip-levantar-mano">
                                                        Pedir la palabra
                                                    </Tooltip>
                                                }>
                                                <Button
                                                    variant="success"
                                                    onClick={this.pedirLaPalabra}>
                                                    <FaRegHandPaper/>
                                                </Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="right"
                                                overlay={
                                                    <Tooltip id="tooltip-compartir-pantalla">
                                                        Compartir pantalla
                                                    </Tooltip>
                                                }>
                                                <Button
                                                    variant="info"
                                                    onClick={this.compartirPantalla}>
                                                    <MdScreenShare/>
                                                </Button>
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col xs={10}>
                                    <DiagramaEditable/>
                                </Col>
                            </Row>
                        </Container> :
                        <Container fluid>
                            <Row>
                                <Col>
                                    <TabView>
                                        <TabPanel header="Diagrama global">
                                            <Row>
                                                <Col xs={1}>
                                                    <Row>
                                                        <Paleta/>
                                                        <Button
                                                            block
                                                        >
                                                           Guardar
                                                        </Button>
                                                    </Row>
                                                </Col>

                                                <Col xs={11}>
                                                    <DiagramaEditable/>
                                                </Col>
                                            </Row>
                                        </TabPanel>
                                        <TabPanel header="Diagrama compartido">
                                            <Row>
                                                <Col xs={2}>
                                                    <Query query={USUARIOS_EN_SALA}>
                                                        {({loading, error, data, subscribeToMore}) => {
                                                            if (loading) return <Spinner id="spinner"
                                                                                         animation="border"/>;
                                                            if (error) return <p>Error ...</p>;

                                                            this.subscribeNuevoUsuarioSala(subscribeToMore, {variables: {id: this.state.sala}});
                                                            this.subscribeCambioUsuario(subscribeToMore, {variables: {id: this.state.sala}});
                                                            this.subscribeCambiosDiagramaUsuario(subscribeToMore);

                                                            const usuariosEnSala = data.findAllUsuariosEnSala.filter(salas => salas.sala.id === this.state.sala.id);
                                                            const existenUsuariosEnSala = usuariosEnSala.length > 0;

                                                            return (
                                                                <div>
                                                                    {
                                                                        !existenUsuariosEnSala ?
                                                                            <h2>No existen usuarios en sala</h2> :
                                                                            <Container fluid>
                                                                                <Col>
                                                                                    {usuariosEnSala.map(
                                                                                        (usuarios, indice) =>
                                                                                            <Button
                                                                                                key={indice}
                                                                                                block
                                                                                                disabled={!usuarios.compartirPantalla}
                                                                                                onClick={
                                                                                                    () => this.cargarDatosCompartidos(usuarios)
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    usuarios.compartirPantalla
                                                                                                        ?
                                                                                                        <FaSatelliteDish/>
                                                                                                        : (
                                                                                                            !usuarios.levantarMano
                                                                                                                ?
                                                                                                                <FaLock/> :
                                                                                                                <FaRegHandPaper/>
                                                                                                        )
                                                                                                }
                                                                                                {usuarios.usuario.nombre}
                                                                                            </Button>
                                                                                    )}
                                                                                </Col>
                                                                            </Container>
                                                                    }
                                                                </div>
                                                            )
                                                        }}
                                                    </Query>
                                                </Col>

                                                <Col xs={10}>
                                                    <DiagramaGlobal/>
                                                </Col>
                                            </Row>
                                        </TabPanel>
                                    </TabView>
                                </Col>
                            </Row>
                        </Container>
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

/*
{!esAdmin ?
    <Container fluid>
        <Row>
            <Col xs={1}>
                <OverlayTrigger
                    placement="right"
                    overlay={
                        <Tooltip id="tooltip-levantar-mano">
                            Pedir la palabra
                        </Tooltip>
                    }>
                    <Button
                        variant="success"
                        onClick={this.pedirLaPalabra}>
                        <FaRegHandPaper/>
                    </Button>
                </OverlayTrigger>
            </Col>

            <Col xs={1}>
                <OverlayTrigger
                    placement="right"
                    overlay={
                        <Tooltip id="tooltip-compartir-pantalla">
                            Compartir pantalla
                        </Tooltip>
                    }>
                    <Button
                        variant="info"
                        onClick={this.compartirPantalla}>
                        <MdScreenShare/>
                    </Button>
                </OverlayTrigger>
            </Col>
        </Row>
    </Container> : (
        <Query query={USUARIOS_EN_SALA}>
            {({loading, error, data, subscribeToMore}) => {
                if (loading) return <Spinner id="spinner" animation="border"/>;
                if (error) return <p>Error ...</p>;

                this.subscribeNuevoUsuarioSala(subscribeToMore, {variables: {id: this.state.sala}});
                this.subscribeCambioUsuario(subscribeToMore, {variables: {id: this.state.sala}});
                this.subscribeCambiosDiagramaUsuario(subscribeToMore);

                const usuariosEnSala = data.findAllUsuariosEnSala.filter(salas => salas.sala.id === this.state.sala.id);
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
}*/
