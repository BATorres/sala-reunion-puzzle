import {diagramaEditable} from '../componentes/diagrama-editable/diagrama-editable/diagrama-editable.component';

export function dibujarConexionCausalidad(evento, boton): any {
  diagramaEditable.model.setCategoryForLinkData(boton.part.adornedPart, 'Causalidad');
}
