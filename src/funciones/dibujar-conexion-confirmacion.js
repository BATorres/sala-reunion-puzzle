import {diagramaEditable} from "../componentes/PantallaInteractivaEditable/PantallaInteractivaEditable";

export function dibujarConexionConfirmacion(evento, boton) {
    diagramaEditable.model.setCategoryForLinkData(boton.part.adornedPart, 'Confirmación');
}