export function crearEditarTexto(evento, boton) {
    var nodo = boton.part.adornedPart;
    evento.diagram.commandHandler.editTextBlock(
        nodo.findObject('Texto')
    );
}