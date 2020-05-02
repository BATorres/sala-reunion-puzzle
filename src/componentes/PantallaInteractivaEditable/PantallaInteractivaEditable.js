import React, {Component} from 'react';
import * as go from "gojs";
import {crearNodo} from "../../funciones/crear-nodo";
import {crearGrupo} from "../../funciones/crear-grupo";
import {crearConexion} from "../../funciones/crear-conexion";
import {crearCasualidad} from "../../funciones/crear-casualidad";
import {crearConfirmacion} from "../../funciones/crear-confirmacion";
import {crearContradiccion} from "../../funciones/crear-contradiccion";
import {GojsDiagram} from "react-gojs";
import io from 'socket.io-client';
import {Button, Col, Container, Row} from "react-bootstrap";
import Paleta from "../Paleta/Paleta";
import {FaLock, FaRegHandPaper, FaSatelliteDish} from "react-icons/fa";
import divWithClassName from "react-bootstrap/esm/divWithClassName";

const socket = io('http://localhost:8081');
const $ = go.GraphObject.make;
const colores = ["lightgray", "lightblue", "lightgreen", "orange", "pink"];

var diagramaEditable;
var datosGuardados;
var datosCompartidos;
var usuariosSeteados = [];
var lleganDatos = false;

function crearDiagrama(id) {
    diagramaEditable = $(
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
                    socket.on('datosRecibidos', (datos) => {
                        console.log('llegaron datos', datos)
                        datosCompartidos = datos.diagrama;
                    });
                    //document.getElementById("savedModel").textContent = diagrama.model.toJson();
                    // socket.emit('compartirPantalla', diagramaEditable.model.toJson())
                }
            },
            model: $(
                go.GraphLinksModel,
                {
                    linkKeyProperty: 'key' // IMPORTANTE! debe definirse para merges y sincronizacion de datos cuando se usa GraphLinksModel
                }
            )
        });

    // define the Node template
    diagramaEditable.nodeTemplate = crearNodo($);

    // crear botones

    // creacion del grupo
    diagramaEditable.groupTemplate = crearGrupo($);

    //creacion de links
    diagramaEditable.linkTemplate = crearConexion($);
    diagramaEditable.linkTemplateMap.add(
        'Casualidad',
        crearCasualidad($)
    );
    diagramaEditable.linkTemplateMap.add(
        'Confirmación',
        crearConfirmacion($)
    );
    diagramaEditable.linkTemplateMap.add(
        'Contradicción',
        crearContradiccion($)
    );


    // definir botones nodos
    diagramaEditable.nodeTemplate.selectionAdornmentTemplate = $(
        go.Adornment, 'Spot',
        $(go.Panel, 'Auto',
            $(go.Shape,
                {
                    stroke: 'dodgerblue',
                    strokeWidth: 2,
                    fill: null
                }
            ),
            $(
                go.Placeholder
            ),
        ),
        $(
            go.Panel, 'Horizontal',
            {
                alignment: go.Spot.Top,
                alignmentFocus: go.Spot.Bottom
            },
            $(
                'Button',
                {
                    click: editarTexto
                },
                $(
                    go.TextBlock, 'A',
                    {
                        font: 'bold 13pt sans-serif',
                        desiredSize: new go.Size(15.5, 15.5),
                        textAlign: 'center'
                    }
                )
            ),
            $(
                'Button',
                {
                    click: cambiarColor,
                    '_buttonFillOver': 'transparent'
                },
                new go.Binding('ButtonBorder.fill', 'color', siguienteColor),
                $(
                    go.Shape,
                    {
                        fill: null,
                        stroke: null,
                        desiredSize: new go.Size(15.5, 15.5),
                    }
                )
            ),
            $(
                'Button',
                {
                    name: 'casualidad',
                    click: dibujarConexionCasualidad,
                },
                $(
                    go.Shape,
                    {
                        geometryString: 'M0 0 L7 0 7 12 14 12 M12 10 L14 12 12 14',
                        stroke: 'blue',
                        strokeWidth: 1.5
                    }
                )
            ),
            $(
                'Button',
                {
                    name: 'confirmación',
                    click: dibujarConexionConfirmacion
                },
                $(
                    go.Shape,
                    {
                        geometryString: 'M0 0 L7 0 7 14 14 14 M12 14',
                        // geometryString: 'M 10 10 24 24',
                        stroke: 'green',
                        strokeWidth: 1.5
                    }
                )
            ),
            $(
                'Button',
                {
                    name: 'contradicción',
                    click: dibujarConexionContradiccion
                },
                $(
                    go.Shape,
                    {
                        geometryString: 'M0 0 L7 0 7 14 14 14 M12 14',
                        stroke: 'red',
                        strokeWidth: 1.5
                    }
                )
            ),
            $(
                'Button',
                {
                    click: eliminarNodo
                },
                $(
                    go.TextBlock, 'X',
                    {
                        font: 'bold 13pt',
                        stroke: 'red',
                        desiredSize: new go.Size(15.5, 15.5),
                        textAlign: 'center'
                    }
                )
            ),
        )
    );

    function editarTexto(evento, boton) {
        var nodo = boton.part.adornedPart;
        evento.diagram.commandHandler.editTextBlock(
            nodo.findObject('Texto')
        );
    }

    function cambiarColor(evento, boton) {
        const nodo = boton.part.adornedPart;
        var forma = nodo.findObject('Nodo');
        if (forma === null) return;
        nodo.diagram.startTransaction('Cambiar color');
        forma.fill = siguienteColor(forma.fill);
        boton['_buttonFillNormal'] = siguienteColor(forma.fill);
        nodo.diagram.commitTransaction('Cambiar color');
    }

    function eliminarNodo(evento, boton) {
        const nodo = boton.part.adornedPart.findObject('Nodo');
        nodo.diagram.startTransaction('Eliminar nodo');
        nodo.diagram.remove(nodo);
        nodo.diagram.commitTransaction('Eliminar nodo');
    }

    function siguienteColor(color) {
        var indice = colores.indexOf(color);
        if (indice < 0) return 'lightgray';
        if (indice >= colores.length - 1) indice = 0;
        return colores[indice + 1];
    }

    function dibujarConexion(nodo, categoria) {
        const tool = diagramaEditable.toolManager.linkingTool;
        diagramaEditable.model.setCategoryForLinkData(tool.archetypeLinkData, categoria);
        tool.startObject = nodo.port;
        diagramaEditable.currentTool = tool;
        tool.doActivate();
    }

    function dibujarConexionCasualidad(evento, boton) {
        dibujarConexion(boton.part.adornedPart, 'Casualidad')
    }


    function dibujarConexionConfirmacion(evento, boton) {
        dibujarConexion(boton.part.adornedPart, 'Confirmación')
    }

    function dibujarConexionContradiccion(evento, boton) {
        dibujarConexion(boton.part.adornedPart, 'Contradicción')
    }

    diagramaEditable.model.addChangedListener(() => {
        const datosAGuardar = diagramaEditable.model.toJson()
        console.log('estoy en evento', datosAGuardar.class)
    });

    return diagramaEditable;
}

function DiagramaEditable() {
    return (
        <GojsDiagram
            diagramId="diagrama-editable"
            createDiagram={crearDiagrama}
            model={{
                nodeDataArray: [
                    {key: "Nodo", loc: "-57.899993896484375 -164", text: "Tema 1"},
                    {key: "Nodo2", loc: "39.100006103515625 -25", text: "Tema 2"}
                ], linkDataArray: [{category: "Casualidad", from: "Nodo2", to: "Nodo"}]
            }}
            onModelChange={console.log}
        />
    )
}

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
                            <div>
                                <Button key={indice}
                                        disabled={
                                            !lleganDatos
                                        }
                                >
                                    <FaLock/>
                                    {usuario}
                                </Button>

                                <Button key={indice}
                                        disabled={
                                            !lleganDatos
                                        }
                                >
                                    <FaRegHandPaper/>
                                    {usuario}
                                </Button>

                                <Button key={indice}
                                        disabled={
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
                    <DiagramaEditable/>
                </Col>
            </div>
        );
    }
}

export default PantallaInteractivaEditable;