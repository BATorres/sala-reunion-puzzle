export function crearEditarTexto(evento, boton): any {
  const nodo = boton.part.adornedPart;
  evento.diagram.commandHandler.editTextBlock(
    nodo.findObject('Texto')
  );
}
