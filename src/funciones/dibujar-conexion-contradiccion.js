import {diagramaEditable} from "../componentes/PantallaInteractivaEditable/PantallaInteractivaEditable";

export function dibujarConexionContradiccion(evento, boton) {
    diagramaEditable.model.setCategoryForLinkData(boton.part.adornedPart, 'Contradicción');
}