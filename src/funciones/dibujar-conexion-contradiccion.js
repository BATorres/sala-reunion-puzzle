import {diagramaEditable} from "../componentes/DiagramaEditable/DiagramaEditable";

export function dibujarConexionContradiccion(evento, boton) {
    diagramaEditable.model.setCategoryForLinkData(boton.part.adornedPart, 'Contradicción');
}