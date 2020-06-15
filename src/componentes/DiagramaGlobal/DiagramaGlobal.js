import React, {Component} from 'react';
import * as go from "gojs";
import {crearNodo} from "../../funciones/crear-nodo";
import {crearGrupo} from "../../funciones/crear-grupo";
import {crearConexion} from "../../funciones/crear-conexion";
import {crearCasualidad} from "../../funciones/crear-casualidad";
import {crearConfirmacion} from "../../funciones/crear-confirmacion";
import {crearContradiccion} from "../../funciones/crear-contradiccion";
import {GojsDiagram} from "react-gojs";

const $ = go.GraphObject.make;

export var diagramaGlobal;

function crearDiagrama(id) {
    diagramaGlobal = $(
        go.Diagram,
        id,
        {
            'linkingTool.isEnabled': false,
            'allowDrop': true,
            'commandHandler.archetypeGroupData': {
                key: 'Grupo',
                isGroup: true,
                color: 'blue'
            }, // permite utilicar ctrl + g para llamar al método groupSelection()
            'undoManager.isEnabled': true, // permite realizar cambios ctrl + z
            "ModelChanged": function (e) {
                if (e.isTransactionFinished) {
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

    return diagramaGlobal;
}

class DiagramaGlobal extends Component {
    constructor(props) {
        super(props);
    }

    escucharCambios = () => {
        diagramaGlobal.addModelChangedListener((evento) => {
            if (evento.isTransactionFinished) {
                evento.model.toJson()
            }
        });
    };

    render() {
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
                linkKeyProperty="key"
                onModelChange={this.escucharCambios}
            />
        );
    }
}

export default DiagramaGlobal;