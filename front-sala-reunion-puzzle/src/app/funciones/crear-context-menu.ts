import {crearBoton} from './crear-boton';

export function crearContextMenu(graphObject) {
  return graphObject(
    'ContextMenu',
    crearBoton(
      graphObject,
      'Agrupar',
      (evento, objeto) => {
        return evento.diagram.commandHandler.groupSelection();
      },
      (objeto) => {
        return objeto.diagram.commandHandler.canGroupSelection();
      },
    ),
    crearBoton(
      graphObject,
      'Desagrupar',
      (evento, objeto) => {
        return evento.diagram.commandHandler.ungroupSelection();
      },
      (objeto) => {
        return objeto.diagram.commandHandler.canUngroupSelection();
      },
    ),
  );
}
