import React, {Component} from 'react';
import * as go from "gojs";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import Paleta from "../../componentes/Paleta/Paleta";
import {FaLock, FaRegHandPaper, FaSatelliteDish} from "react-icons/fa";
import DiagramaEditable from "../../componentes/DiagramaEditable/DiagramaEditable";
import {diagramaEditable} from "../../componentes/DiagramaEditable/DiagramaEditable";
import {gql} from "apollo-client-preset";
import {Mutation, Query, graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';

var datosGuardados;

var datosCompartidos;

var usuariosSeteados = [];

var lleganDatos = false;

const USUARIOS_EN_SALA = gql`
    query FindAllUsuariosEnSala($idSala: ID) {
        findAllUsuariosEnSala(idSala: $idSala) {
            id
            levantarMano
            compartirPantalla
            usuario {
                id
                nombre
            }
            sala {
                id
                nombre
            }
        }
    }`;

const NUEVO_USUARIO_SALA = gql`
    subscription {
        usuarioSala(
            where: {
                mutation_in: [CREATED]
            }
        ){
            node {
                id
                levantarMano
                compartirPantalla
                usuario {
                    id
                    nombre
                }
                sala {
                    id
                    nombre
                }
            }
        }
    }`;

const CAMBIOS_USUARIO = gql`
    subscription {
        usuarioSala(
            where: {
                mutation_in: [UPDATED]
            }
        ) {
            node {
                id
                levantarMano
                compartirPantalla
                usuario {
                    id
                    nombre
                }
                sala {
                    id
                    nombre
                }
            }
        }
    }
`;

const ACCIONES_USUARIO_SALA = gql`
    mutation AccionesUsuarioSala($idSala: ID, $idUsuario: ID, $tipoAccion: String) {
        accionesUsuarioSala(idSala: $idSala, idUsuario: $idUsuario, tipoAccion: $tipoAccion) {
            id
        }
    }`;

function guardar() {
    document.getElementById('diagrama-editable').value = diagramaEditable.model.toJson();
    datosGuardados = diagramaEditable.model.toJson();
    diagramaEditable.isModified = false;
    console.log('datos guardados?', datosGuardados);
}

function cargar() {
    diagramaEditable.model = go.Model.fromJson(datosGuardados);
    console.log('está cargando?', datosGuardados)
}

function compartirPantalla() {
    // socket.emit('compartirPantalla', { usuario: localStorage.getItem('usuario'), diagrama: diagramaEditable.model.toJson()});
}

function cargarPantallaCompartida() {
    if (datosCompartidos) {
        diagramaEditable.model = go.Model.fromJson(datosCompartidos)
        return true;
    } else {
        return false;
    }
}

class PantallaInteractivaEditable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sala: this.props.match.params,
            usuarioAdmin: localStorage.getItem('usuarioAdmin'),
            usuario: localStorage.getItem('usuario')
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
                    findAllUsuariosEnSala: [nuevoUsuarioEnSala, ...usuariosEnSala.findAllUsuariosEnSala]
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

    pedirLaPalabra = () => {
      this.props.mutate({
          variables: {
              idSala: this.state.sala.idSala,
              idUsuario: localStorage.getItem('usuario'),
              tipoAccion: 'Pedir la palabra'
          }
      })
    };

    render() {
        const esAdmin = this.props.history.location.pathname.includes('admin');
        const usuariosGuardados = JSON.parse(localStorage.getItem(this.state.sala.idSala));
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
                                onClick={compartirPantalla}>
                                Compartir
                            </Button>
                        </Row> : (
                            <Query query={USUARIOS_EN_SALA}>
                                {({loading, error, data, subscribeToMore}) => {
                                    if (loading) return <p>Cargando ...</p>;
                                    if (error) return <p>Error ...</p>;

                                    this.subscribeNuevoUsuarioSala(subscribeToMore, {variables: {id: this.state.sala}});
                                    this.subscribeCambioUsuario(subscribeToMore, {variables: {id: this.state.sala}});

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
                    <DiagramaEditable sala={this.state.sala}/>
                </Col>
            </div>
        );
    }
}

export default compose(
    graphql(
        ACCIONES_USUARIO_SALA
    )
)
(PantallaInteractivaEditable);

/*
usuariosGuardados  ? usuariosGuardados.map((usuario, indice) => (
    <div key={indice}>
        <Button disabled={
            !lleganDatos
        }
        >
            <FaLock/>
            {usuario}
        </Button>

        <Button disabled={
            !lleganDatos
        }
        >
            <FaRegHandPaper/>
            {usuario}
        </Button>

        <Button disabled={
            !lleganDatos
        }
        >
            <FaSatelliteDish/>
            {usuario}
        </Button>
    </div>*/
