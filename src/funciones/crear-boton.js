import * as go from 'gojs';

export function crearBoton(graphObject, texto, accion, visibilidad) {
  return graphObject(
    'ContextMenuButton',
    graphObject(
      go.TextBlock,
      texto
    ),
    {
      click: accion
    },
    visibilidad ? new go.Binding(
      'visible',
      '',
      (objeto, evento) => {
        return objeto.diagram ? visibilidad(objeto, evento) : false;
      }
    ).ofObject() : {}
  );
}
