import {diagramaEditable} from '../componentes/diagrama-editable/diagrama-editable/diagrama-editable.component';

export function dibujarConexionCasualidad(evento, boton): any {
  diagramaEditable.model.setCategoryForLinkData(boton.part.adornedPart, 'Casualidad');
}
