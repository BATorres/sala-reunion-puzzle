import * as go from 'gojs';
import {crearEditarTexto} from "./crear-editar-texto";
import {dibujarConexionCasualidad} from "./dibujar-conexion-casualidad";
import {dibujarConexionConfirmacion} from "./dibujar-conexion-confirmacion";
import {dibujarConexionContradiccion} from "./dibujar-conexion-contradiccion";
import {eliminarNodoOConexion} from "./eliminar-nodo-o-conexion";

export function crearConfirmacion(graphObject, esDiagramaEditable) {
    if (esDiagramaEditable) {
        return graphObject(
            go.Link,
            {
                relinkableFrom: true,
                relinkableTo: true,
                routing: go.Link.AvoidsNodes
            },
            graphObject(
                go.Shape,
                {
                    name: 'Confirmacion',
                    strokeWidth: 2,
                    stroke: 'green'
                },
            ),
            graphObject(
                go.Panel,
                'Auto',
                graphObject(
                    go.TextBlock,
                    {
                        name: 'Texto',
                    },
                    new go.Binding(
                        'text',
                        'key',
                    ).makeTwoWay()
                )
            ),
            {
                selectionAdornmentTemplate:
                    graphObject(
                        go.Adornment,
                        'Link',
                        graphObject(
                            go.Shape,
                            {
                                stroke: 'dodgerblue',
                                strokeWidth: 2,
                                fill: null
                            }
                        ),
                        graphObject(
                            go.Panel,
                            'Horizontal',
                            {
                                alignment: go.Spot.Top,
                                alignmentFocus: go.Spot.Bottom
                            },
                            graphObject(
                                'Button',
                                {
                                    click: crearEditarTexto
                                },
                                graphObject(
                                    go.TextBlock, 'A',
                                    {
                                        font: 'bold 13pt sans-serif',
                                        desiredSize: new go.Size(15.5, 15.5),
                                        textAlign: 'center'
                                    }
                                )
                            ),
                            graphObject(
                                'Button',
                                {
                                    name: 'casualidad',
                                    click: dibujarConexionCasualidad
                                },
                                graphObject(
                                    go.Shape,
                                    {
                                        geometryString: 'M0 0 L7 0 7 12 14 12 M12 10 L14 12 12 14',
                                        stroke: 'blue',
                                        strokeWidth: 1.5
                                    }
                                )
                            ),
                            graphObject(
                                'Button',
                                {
                                    name: 'confirmación',
                                    click: dibujarConexionConfirmacion
                                },
                                graphObject(
                                    go.Shape,
                                    {
                                        geometryString: 'M0 0 L7 0 7 14 14 14 M12 14',
                                        // geometryString: 'M 10 10 24 24',
                                        stroke: 'green',
                                        strokeWidth: 1.5
                                    }
                                )
                            ),
                            graphObject(
                                'Button',
                                {
                                    name: 'contradicción',
                                    click: dibujarConexionContradiccion
                                },
                                graphObject(
                                    go.Shape,
                                    {
                                        geometryString: 'M0 0 L7 0 7 14 14 14 M12 14',
                                        stroke: 'red',
                                        strokeWidth: 1.5
                                    }
                                )
                            ),
                            graphObject(
                                'Button',
                                {
                                    click: eliminarNodoOConexion
                                },
                                graphObject(
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
                    )
            }
        )
    } else {
        return graphObject(
            go.Link,
            {
                relinkableFrom: true,
                relinkableTo: true,
                routing: go.Link.AvoidsNodes
            },
            graphObject(
                go.Shape,
                {
                    name: 'Confirmacion',
                    strokeWidth: 2,
                    stroke: 'green'
                },
            ),
        )
    }
}
