import React, {Component} from 'react';
import * as go from "gojs";
import {GojsDiagram} from "react-gojs";

const $ = go.GraphObject.make;

function crearPaleta(id) {
    const paleta = $(go.Palette, id);
    paleta.nodeTemplate = $(
        go.Node,
        'Horizontal',
        $(
            go.Shape,
            {
                width: 30,
                height: 30,
                fill: 'white'
            }
        ),
        $(
            go.TextBlock,
            {
                stroke: 'white'
            },
            new go.Binding(
                'text',
                'key'
            )
        )
    );
    return paleta
}

class Paleta extends Component {
    render() {
        return (
            <GojsDiagram
                diagramId="paleta"
                createDiagram={crearPaleta}
                model={{
                    nodeDataArray: [{key: 'Nodo'}],
                    linkDataArray: [],
                }}
            />
        )
    }
}

export default Paleta;