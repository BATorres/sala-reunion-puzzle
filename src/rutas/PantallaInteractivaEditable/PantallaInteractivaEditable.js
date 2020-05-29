import React, {Component} from 'react';
import * as go from "gojs";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import Paleta from "../../componentes/Paleta/Paleta";
import {FaLock, FaRegHandPaper, FaSatelliteDish} from "react-icons/fa";
import DiagramaEditable from "../../componentes/DiagramaEditable/DiagramaEditable";
import {diagramaEditable} from "../../componentes/DiagramaEditable/DiagramaEditable";
import {gql} from "apollo-client-preset";
import {Mutation, Query, graphql} from 'react-apollo';

var datosGuardados;

var datosCompartidos;

var usuariosSeteados = [];

var lleganDatos = false;

const USUARIOS_EN_SALA = gql`
    query BuscarUsuariosEnSala($idSala: ID) {
        buscarUsuariosEnSala(idSala: $idSala) {
            usuario {
                id
                nombre
            }
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

    componentDidMount() {
        const usuariosEnSala = this.verificarUsuarioEnSala();
        const esAdmin = this.props.history.location.pathname.includes('admin');


        if (!esAdmin && !usuariosEnSala) {
            // socket.emit('unirseSala', {sala: this.state.sala, usuario: this.state.usuario});
        }

        const usuariosGuardados = JSON.parse(localStorage.getItem(this.state.sala.idSala));

        if (usuariosGuardados) {
            usuariosSeteados = usuariosGuardados;
            return usuariosSeteados;
        } else {
            return [];
        }
    }

    verificarUsuarioEnSala = () => {
        const existenUsuariosGuardados = JSON.parse(localStorage.getItem(this.state.sala.idSala));
        if (existenUsuariosGuardados) {
            return existenUsuariosGuardados.some(usuario => usuario === this.state.usuario);
        } else {
            return false;
        }
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
                                onClick={guardar}>
                                Pedir la palabra
                            </Button>

                            <Button
                                variant="info"
                                onClick={compartirPantalla}>
                                Compartir
                            </Button>
                        </Row> : (
                            <Query query={USUARIOS_EN_SALA}>
                                {({loading, error, data}) => {
                                    if (loading) return <p>Cargando ...</p>;
                                    if (error) return <p>Error ...</p>;

                                    const usuariosEnSala = data.buscarUsuariosEnSala.map(usuarios => usuarios.usuario);
                                    const existenUsuariosEnSala = usuariosEnSala.length > 0;

                                    return (
                                        <div>
                                            {
                                                !existenUsuariosEnSala ?
                                                    <h2>No existen usuarios en sala</h2> :
                                                    <Row>
                                                        {usuariosEnSala.map(
                                                            (usuario, indice) =>
                                                                <Button key={indice}>
                                                                    <FaLock/>
                                                                    {usuario.nombre}
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

export default PantallaInteractivaEditable;

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
