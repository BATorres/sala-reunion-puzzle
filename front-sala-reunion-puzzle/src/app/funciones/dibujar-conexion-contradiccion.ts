import {diagramaEditable} from '../componentes/diagrama-editable/diagrama-editable/diagrama-editable.component';

export function dibujarConexionContradiccion(evento, boton): any {
  diagramaEditable.model.setCategoryForLinkData(boton.part.adornedPart, 'Contradicción');
}
