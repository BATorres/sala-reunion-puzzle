import {diagramaEditable} from "../componentes/PantallaInteractivaEditable/PantallaInteractivaEditable";

export function dibujarConexionCasualidad(evento, boton) {
    diagramaEditable.model.setCategoryForLinkData(boton.part.adornedPart, 'Casualidad');
}