import React, {Component} from 'react';
import * as go from "gojs";
import io from 'socket.io-client';
import {Button, Col, Container, Row} from "react-bootstrap";
import Paleta from "../Paleta/Paleta";
import {FaLock, FaRegHandPaper, FaSatelliteDish} from "react-icons/fa";
import DiagramaEditable from "../DiagramaEditable/DiagramaEditable";
import {diagramaEditable} from "../DiagramaEditable/DiagramaEditable";

const socket = io('http://localhost:8081');

var datosGuardados;
var datosCompartidos;
var usuariosSeteados = [];
var lleganDatos = false;

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
    socket.emit('compartirPantalla', { usuario: localStorage.getItem('usuario'), diagrama: diagramaEditable.model.toJson()});
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
        const socket = io('http://localhost:8081');
        const usuariosEnSala = this.verificarUsuarioEnSala();
        const esAdmin = this.props.history.location.pathname.includes('admin');


        if (!esAdmin && !usuariosEnSala) {
            socket.emit('unirseSala', {sala: this.state.sala, usuario: this.state.usuario});
        }

        socket.on('usuarioUnido', (datos) => {
            const datosAGuardar = datos
                .filter(
                    datosSocket => datosSocket.sala.idSala === this.state.sala.idSala
                )
                .map(
                    datosSocket => datosSocket.usuario
                );
            localStorage.setItem(this.state.sala.idSala, JSON.stringify(datosAGuardar));
        });

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
                        </Row> : (usuariosGuardados  ? usuariosGuardados.map((usuario, indice) => (
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
                            </div>)
                        ) : 'No existen usuarios unidos a la sala')
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