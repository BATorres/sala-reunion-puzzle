import {diagramaEditable} from '../componentes/diagrama-editable/diagrama-editable/diagrama-editable.component';

export function dibujarConexionConfirmacion(evento, boton) {
  diagramaEditable.model.setCategoryForLinkData(boton.part.adornedPart, 'Confirmación');
}
