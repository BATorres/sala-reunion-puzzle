import {diagramaEditable} from "../componentes/DiagramaEditable/DiagramaEditable";

export function dibujarConexionCasualidad(evento, boton) {
    diagramaEditable.model.setCategoryForLinkData(boton.part.adornedPart, 'Casualidad');
}