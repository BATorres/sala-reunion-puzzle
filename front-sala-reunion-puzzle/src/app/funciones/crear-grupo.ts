import * as go from 'gojs';
import {crearContextMenu} from './crear-context-menu';

export function crearGrupo(graphObject): any {
  return graphObject(
    go.Group,
    'Vertical',
    {
      selectionObjectName: 'Paleta grupo',
      ungroupable: true,
    },
    graphObject(
      go.TextBlock,
      {
        editable: true,
      },
      new go.Binding(
        'text',
        'key'
      ).makeTwoWay()),
    graphObject(
      go.Panel,
      'Auto',
      {
        name: 'Paleta grupo'
      },
      graphObject(
        go.Shape,
        'Rectangle',
        {
          fill: 'gray',
          fromLinkable: true,
          toLinkable: true,
        }),
      graphObject(
        go.Placeholder,
        {
          margin: 10,
          background: 'transparent'
        }
      ),
      {
        contextMenu: crearContextMenu(graphObject)
      }
    ),
  );
}
