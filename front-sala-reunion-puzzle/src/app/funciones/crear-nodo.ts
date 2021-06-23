import * as go from 'gojs';
import {crearContextMenu} from './crear-context-menu';
import {expandirNodo} from './expandir-nodo';

export function crearNodo(graphObject): any {
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
      go.TextBlock,
      {
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
      'Button',
      {
        alignment: go.Spot.TopRight
      },
      graphObject(
        go.Shape,
        'PlusLine',
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
