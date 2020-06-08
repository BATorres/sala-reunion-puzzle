import React, {Component} from 'react';
import * as go from "gojs";
import {crearNodo} from "../../funciones/crear-nodo";
import {crearGrupo} from "../../funciones/crear-grupo";
import {crearConexion} from "../../funciones/crear-conexion";
import {crearCasualidad} from "../../funciones/crear-casualidad";
import {crearConfirmacion} from "../../funciones/crear-confirmacion";
import {crearContradiccion} from "../../funciones/crear-contradiccion";
import {crearEditarTexto} from "../../funciones/crear-editar-texto";
import {eliminarNodoOConexion} from "../../funciones/eliminar-nodo-o-conexion";
import {GojsDiagram} from "react-gojs";

const $ = go.GraphObject.make;
const colores = ["lightgray", "lightblue", "lightgreen", "orange", "pink"];

export var diagramaEditable;

function crearDiagrama(id) {
    diagramaEditable = $(
        go.Diagram,
        id,
        {
            'linkingTool.isEnabled': false,
            /*'allowDrop': true,
            'clickCreatingTool.archetypeNodeData': {
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
                    /*socket.on('datosRecibidos', (datos) => {
                        console.log('llegaron datos', datos)
                        datosCompartidos = datos.diagrama;
                    });*/
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
                    click: crearEditarTexto
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
                    click: eliminarNodoOConexion
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

    function cambiarColor(evento, boton) {
        const nodo = boton.part.adornedPart;
        var forma = nodo.findObject('Nodo');
        if (forma === null) return;
        nodo.diagram.startTransaction('Cambiar color');
        forma.fill = siguienteColor(forma.fill);
        boton['_buttonFillNormal'] = siguienteColor(forma.fill);
        nodo.diagram.commitTransaction('Cambiar color');
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

    return diagramaEditable;
}

class DiagramaEditable extends Component {
    constructor(props) {
        super(props);
    }

    escucharCambios = () => {
        diagramaEditable.addModelChangedListener((evento) => {
            if (evento.isTransactionFinished) {
                evento.model.toJson()
            }
        });
    };

    render() {
        return (
            <GojsDiagram
                diagramId="diagrama-editable"
                createDiagram={crearDiagrama}
                model={{
                    nodeDataArray: [
                        {key: "Nodo", loc: "-57.899993896484375 -164", text: "Tema 1"},
                        {key: "Nodo2", loc: "39.100006103515625 -25", text: "Tema 2"}
                    ],
                    linkDataArray: [
                        {category: "Casualidad", from: "Nodo2", to: "Nodo"}
                    ],
                }}
                linkKeyProperty="key"
                onModelChange={this.escucharCambios}
            />
        )
    }
}

export default DiagramaEditable;