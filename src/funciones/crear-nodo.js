import * as go from 'gojs';
import {crearContextMenu} from './crear-context-menu';

export function crearNodo(graphObject) {
    return graphObject(
        go.Node,
        'Auto',
        graphObject(
            go.Shape,
            'RoundedRectangle',
            {
                portId: '',
                cursor: 'pointer',
                fromSpot: go.Spot.AllSides,
                toSpot: go.Spot.AllSides,
                fromLinkable: true,
                toLinkable: true,
                fill: 'white',
            },
            new go.Binding(
                'fill',
                'color'
            ),
        ),
        graphObject(
            go.TextBlock,
            {
                name: 'Texto',
                margin: 6,
                text: 'Nuevo',
                // editable: true,
            },
            new go.Binding(
                'text',
                'text'
            ).makeTwoWay(),
        ),
        new go.Binding(
            'location',
            'loc',
            go.Point.parse
        ).makeTwoWay(
            go.Point.stringify
        ),
        {
            contextMenu: crearContextMenu(graphObject)
        }
    );
}
