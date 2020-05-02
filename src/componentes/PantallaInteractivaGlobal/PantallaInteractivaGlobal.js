import React, {Component} from 'react';
import io from 'socket.io-client';
import * as go from "gojs";
import {crearNodo} from "../../funciones/crear-nodo";
import {crearGrupo} from "../../funciones/crear-grupo";
import {crearConexion} from "../../funciones/crear-conexion";
import {crearCasualidad} from "../../funciones/crear-casualidad";
import {crearConfirmacion} from "../../funciones/crear-confirmacion";
import {crearContradiccion} from "../../funciones/crear-contradiccion";
import {GojsDiagram} from "react-gojs";
import {Button, Col, Container, Row} from "react-bootstrap";
import {FaUserAlt} from "react-icons/fa";
import Paleta from "../Paleta/Paleta";

const socket = io('/');
const $ = go.GraphObject.make;

var diagramaGlobal;
var otroDiagrama;
var datosGuardados;
var datosCompartidos;
var estadoBoton;
var arregloUsuarios = [];

function crearDiagrama(id) {
    diagramaGlobal = $(
        go.Diagram,
        id,
        {
            'linkingTool.isEnabled': false,
            'allowDrop': true,
            /*'clickCreatingTool.archetypeNodeData': {
                text: 'Nuevo',
                color: 'white'
            },*/ // permite crear nuevos nodos con doble clic
            'commandHandler.archetypeGroupData': {
                key: 'Grupo',
                isGroup: true,
                color: 'blue'
            }, // permite utilicar ctrl + g para llamar al método groupSelection()
            'undoManager.isEnabled': true, // permite realizar cambios ctrl + z
            "ModelChanged": function (e) {
                if (e.isTransactionFinished) {
                    //document.getElementById("savedModel").textContent = diagrama.model.toJson();
                    socket.on('datosRecibidos', (datos) => {
                        console.log('llegaron datos', datos)
                        datosCompartidos = datos;
                    })
                    // socket.emit('enviarDatosGenerales', diagrama.model.toJson())
                }
            },
            model: $(
                go.GraphLinksModel,
                {
                    linkKeyProperty: 'key' // IMPORTANTE! debe definirse para merges y sincronizacion de datos cuando se usa GraphLinksModel
                }
            )
        });

    diagramaGlobal.isReadOnly = true;

    // define the Node template
    diagramaGlobal.nodeTemplate = crearNodo($);

    // crear botones

    // creacion del grupo
    diagramaGlobal.groupTemplate = crearGrupo($);

    //creacion de links
    diagramaGlobal.linkTemplate = crearConexion($);
    diagramaGlobal.linkTemplateMap.add(
        'Casualidad',
        crearCasualidad($)
    );
    diagramaGlobal.linkTemplateMap.add(
        'Confirmación',
        crearConfirmacion($)
    );
    diagramaGlobal.linkTemplateMap.add(
        'Contradicción',
        crearContradiccion($)
    );

    diagramaGlobal.model.addChangedListener(() => {
        const datosAGuardar = diagramaGlobal.model.toJson()
        console.log('estoy en evento', datosAGuardar.class)
    });

    return diagramaGlobal;
}

function guardar() {
    document.getElementById('diagrama-global').value = diagramaGlobal.model.toJson();
    datosGuardados = diagramaGlobal.model.toJson();
    diagramaGlobal.isModified = false;
    console.log('datos guardados?', datosGuardados);
}

function cargar() {
    diagramaGlobal.model = go.Model.fromJson(datosGuardados);
    console.log('está cargando?', datosGuardados)
}

function compartirPantalla() {
    socket.emit('compartirPantalla', otroDiagrama.model.toJson());
}

function cargarPantallaCompartida() {
    diagramaGlobal.model = go.Model.fromJson(datosCompartidos)
}

function Diagrama() {
    return (
        <GojsDiagram
            diagramId="diagrama-global"
            createDiagram={crearDiagrama}
            model={{
                nodeDataArray: [
                    {key: "Nodo", loc: "-57.899993896484375 -164", text: "Tema 1"},
                    {key: "Nodo2", loc: "39.100006103515625 -25", text: "Tema 2"}
                ], linkDataArray: [{category: "Casualidad", from: "Nodo2", to: "Nodo"}]
            }}
            onModelChange={console.log('onModelChange')}
        />
    );
}

class PantallaInteractivaGlobal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sala: this.props.match.params,
            usuarioAdmin: localStorage.getItem('usuarioAdmin'),
            usuario: localStorage.getItem('usuario')
        };
    }

    componentDidMount() {
        const usuariosEnSala = JSON.parse(localStorage.getItem(this.state.sala.idSala));

        if (usuariosEnSala) {
            return arregloUsuarios = usuariosEnSala;
        } else {
            return [];
        }
    }

    render() {
        const {usuarios} = arregloUsuarios;
        return (
            <div id="contenedor">
                <div id="area-paleta">
                    <Paleta/>
                    <Row>
                        {usuarios ? usuarios.forEach(usuario =>
                            <Button
                                onClick={cargarPantallaCompartida}>
                                {usuario}
                                <FaUserAlt/>
                            </Button>
                        ) : 'No se han unido usuarios a la sala'
                        }
                    </Row>
                </div>
                <Col id="diagrama">
                    <Diagrama/>
                </Col>
            </div>
        );
    }
}

export default PantallaInteractivaGlobal;