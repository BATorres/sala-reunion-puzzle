import * as go from 'gojs';
import {crearContextMenu} from './crear-context-menu';
import {expandirNodo} from './expandir-nodo';

export function nodoExpandido(graphObject): any {
  return graphObject(
    go.Node,
    'Auto',
    graphObject(
      go.Shape,
      'RoundedRectangle',
      {
        name: 'Nodo',
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
      ).makeTwoWay(),
    ),
    graphObject(
      go.Panel,
      'Table',
      {
        defaultAlignment: go.Spot.Left
      },
      graphObject(
        go.TextBlock,
        {
          row: 0,
          column: 0,
          columnSpan: 2,
          name: 'Texto',
          margin: 6,
          text: 'Nuevo tema'
        },
        new go.Binding(
          'text',
          'titulo'
        ).makeTwoWay(),
      ),
      graphObject(
        go.TextBlock,
        {
          row: 1,
          column: 0,
          font: 'bold 10pt sans-serif',
        },
        'Fuente:'
      ),
      graphObject(
        go.TextBlock,
        {
          row: 1,
          column: 1
        },
        new go.Binding(
          'text',
          'fuente'
        )
      ),
      graphObject(
        go.TextBlock,
        {
          row: 2,
          column: 0,
          font: 'bold 10pt sans-serif',
        },
        'Resumen:'
      ),
      graphObject(
        go.TextBlock,
        {
          row: 2,
          column: 1
        },
        new go.Binding(
          'text',
          'resumen'
        )
      ),
      graphObject(
        go.TextBlock,
        {
          row: 3,
          column: 0,
          font: 'bold 10pt sans-serif',
        },
        'Tema:'
      ),
      graphObject(
        go.TextBlock,
        {
          row: 3,
          column: 1
        },
        new go.Binding(
          'text',
          'tema'
        )
      ),
      graphObject(
        go.TextBlock,
        {
          row: 4,
          column: 0,
          font: 'bold 10pt sans-serif',
        },
        'Actor:'
      ),
      graphObject(
        go.TextBlock,
        {
          row: 4,
          column: 1
        },
        new go.Binding(
          'text',
          'actor'
        )
      ),
    ),
    graphObject(
      'Button',
      {
        alignment: go.Spot.TopRight
      },
      graphObject(
        go.Shape,
        'MinusLine',
        {
          width: 8,
          height: 8
        }
      ),
      {
        click: expandirNodo
      }
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
