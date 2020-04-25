import React, {Component} from 'react';
import * as go from 'gojs';
import {ReactDiagram} from 'gojs-react';
import './PantallaInteractiva.css'
import {crearNodo} from "../../funciones/crear-nodo";
import {crearGrupo} from "../../funciones/crear-grupo";
import {crearConexion} from "../../funciones/crear-conexion";
import {crearCasualidad} from "../../funciones/crear-casualidad";
import {crearConfirmacion} from "../../funciones/crear-confirmacion";
import {crearContradiccion} from "../../funciones/crear-contradiccion";

function initDiagram() {
    const $ = go.GraphObject.make;
    const diagrama = $(
        go.Diagram,
        {
            'linkingTool.isEnabled': false,
            'clickCreatingTool.archetypeNodeData': {
                key: 'Nuevo',
                color: 'white'
            }, // permite crear nuevos nodos con doble clic
            'commandHandler.archetypeGroupData': {
                key: 'Grupo',
                isGroup: true,
                color: 'blue'
            }, // permite utilicar ctrl + g para llamar al método groupSelection()
            'undoManager.isEnabled': true, // permite realizar cambios ctrl + z
            model: $(
                go.GraphLinksModel,
                {
                    linkKeyProperty: 'key' // IMPORTANTE! debe definirse para merges y sincronizacion de datos cuando se usa GraphLinksModel
                }
            )
        });

    // define the Node template
    diagrama.nodeTemplate = crearNodo($);

    // crear botones

    // creacion del grupo
    diagrama.groupTemplate = crearGrupo($);

    //creacion de links
    diagrama.linkTemplate = crearConexion($);
    diagrama.linkTemplateMap.add(
        'Relacion',
        crearCasualidad($)
    );
    diagrama.linkTemplateMap.add(
        'Afirmacion',
        crearConfirmacion($)
    );
    diagrama.linkTemplateMap.add(
        'Negacion',
        crearContradiccion($)
    );


    // definir botones nodos
    diagrama.nodeTemplate.selectionAdornmentTemplate = $(
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
                    click: editText
                },
                $(
                    go.TextBlock, 'T',
                    {
                        font: 'bold 10pt sans-serif',
                        desiredSize: new go.Size(15, 15),
                        textAlign: 'center'
                    }
                )
            ),
            $(
                'Button',
                {
                    name: 'relacion',
                    click: dibujarConexionRelacion,
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
                    name: 'afirmacion',
                    click: dibujarConexionAfirmacion
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
                    name: 'negacion',
                    click: dibujarConexionNegacion
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
        )
    );

    function editText(e, button) {
        var node = button.part.adornedPart;
        e.diagram.commandHandler.editTextBlock(node.findObject('TEXTO'))
    }

    function dibujarConexion(nodo, categoria) {
        const tool = diagrama.toolManager.linkingTool;
        diagrama.model.setCategoryForLinkData(tool.archetypeLinkData, categoria);
        tool.startObject = nodo.port;
        diagrama.currentTool = tool;
        tool.doActivate();
    }

    function dibujarConexionAfirmacion(e, boton) {
        dibujarConexion(boton.part.adornedPart, 'Afirmacion')
    }

    function dibujarConexionRelacion(e, boton) {
        dibujarConexion(boton.part.adornedPart, 'Relacion')
    }

    function dibujarConexionNegacion(e, boton) {
        dibujarConexion(boton.part.adornedPart, 'Negacion')
    }

    return diagrama;
}

function handleModelChange(changes) {
    alert('GoJS model changed!');
}

class PantallaInteractiva extends Component {
    render() {
        return (
            <div>
                <ReactDiagram
                    initDiagram={initDiagram}
                    divClassName='diagram-component'
                    nodeDataArray={[
                        {key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0'},
                        {key: 1, text: 'Beta', color: 'orange', loc: '150 0'},
                        {key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150'},
                        {key: 3, text: 'Delta', color: 'pink', loc: '150 150'}
                    ]}
                    linkDataArray={[
                        {key: -1, from: 0, to: 1},
                        {key: -2, from: 0, to: 2},
                        {key: -3, from: 1, to: 1},
                        {key: -4, from: 2, to: 3},
                        {key: -5, from: 3, to: 0}
                    ]}
                    onModelChange={handleModelChange}
                />
            </div>
        );
    }
}

export default PantallaInteractiva;
