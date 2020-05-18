import {diagramaEditable} from "../componentes/DiagramaEditable/DiagramaEditable";

export function dibujarConexionConfirmacion(evento, boton) {
    diagramaEditable.model.setCategoryForLinkData(boton.part.adornedPart, 'Confirmación');
}