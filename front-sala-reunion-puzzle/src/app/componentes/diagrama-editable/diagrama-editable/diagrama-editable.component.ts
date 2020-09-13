import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as go from 'gojs';
import {crearNodo} from '../../../funciones/crear-nodo';
import {crearGrupo} from '../../../funciones/crear-grupo';
import {crearConexion} from '../../../funciones/crear-conexion';
import {crearCasualidad} from '../../../funciones/crear-casualidad';
import {crearContradiccion} from '../../../funciones/crear-contradiccion';
import {crearConfirmacion} from '../../../funciones/crear-confirmacion';
import {eliminarNodoOConexion} from '../../../funciones/eliminar-nodo-o-conexion';
import {COLORES} from '../../../constantes/colores';
import {crearEditarTexto} from '../../../funciones/crear-editar-texto';
import {nodoExpandido} from '../../../funciones/nodo-expandido';

export var diagramaEditable;

@Component({
  selector: 'app-diagrama-editable',
  templateUrl: './diagrama-editable.component.html',
  styleUrls: ['./diagrama-editable.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DiagramaEditableComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  crearDiagramaEditable(): go.Diagram {
    const $ = go.GraphObject.make;
    const colores = COLORES;
    diagramaEditable = $(
      go.Diagram,
      {
        'linkingTool.isEnabled': false,
        'undoManager.isEnabled': true, // permite realizar cambios ctrl + z
        'commandHandler.archetypeGroupData': {
          key: 'Grupo',
          isGroup: true,
          color: 'blue'
        }, // permite utilicar ctrl + g para llamar al método groupSelection()
        model: $(
          go.GraphLinksModel,
          {
            linkKeyProperty: 'key' // IMPORTANTE! debe definirse para merges y sincronizacion de datos cuando se usa GraphLinksModel
          }
        )
      });

    // creación de nodos
    const configuracionesNodo = new go.Map();
    configuracionesNodo.add('simple', crearNodo($));
    configuracionesNodo.add('expandido', nodoExpandido($));
    diagramaEditable.nodeTemplateMap = configuracionesNodo;

    // creación de grupos
    diagramaEditable.groupTemplate = crearGrupo($);

    // creación de distintos tipos de enlaces
    diagramaEditable.linkTemplate = crearConexion($);
    diagramaEditable.linkTemplateMap.add(
      'Casualidad',
      crearCasualidad($, true)
    );
    diagramaEditable.linkTemplateMap.add(
      'Confirmación',
      crearConfirmacion($, true)
    );
    diagramaEditable.linkTemplateMap.add(
      'Contradicción',
      crearContradiccion($, true)
    );

    // definir los botones para los nodos
    diagramaEditable.nodeTemplate = configuracionesNodo.get('simple');
    diagramaEditable.nodeTemplate.selectionAdornmentTemplate = $(
      go.Adornment, 'Spot',
      $(go.Panel, 'Auto',
        $(go.Shape,
          {
            stroke: 'dodgerblue',
            strokeWidth: 2,
            fill: null
          }
        ),
        $(
          go.Placeholder
        ),
      ),
      $(
        go.Panel, 'Horizontal',
        {
          alignment: go.Spot.Top,
          alignmentFocus: go.Spot.Bottom
        },
        $(
          'Button',
          {
            click: crearEditarTexto
          },
          $(
            go.TextBlock, 'A',
            {
              font: 'bold 13pt sans-serif',
              desiredSize: new go.Size(15.5, 15.5),
              textAlign: 'center'
            }
          )
        ),
        $(
          'Button',
          {
            click: cambiarColor,
            '_buttonFillOver': 'transparent'
          },
          new go.Binding('ButtonBorder.fill', 'color', siguienteColor),
          $(
            go.Shape,
            {
              fill: null,
              stroke: null,
              desiredSize: new go.Size(15.5, 15.5),
            }
          )
        ),
        $(
          'Button',
          {
            name: 'casualidad',
            click: dibujarConexionCasualidad,
          },
          $(
            go.Shape,
            {
              geometryString: 'M0 0 L7 0 7 12 14 12 M12 10 L14 12 12 14',
              stroke: 'blue',
              strokeWidth: 1.5
            }
          )
        ),
        $(
          'Button',
          {
            name: 'confirmación',
            click: dibujarConexionConfirmacion
          },
          $(
            go.Shape,
            {
              geometryString: 'M0 0 L7 0 7 14 14 14 M12 14',
              // geometryString: 'M 10 10 24 24',
              stroke: 'green',
              strokeWidth: 1.5
            }
          )
        ),
        $(
          'Button',
          {
            name: 'contradicción',
            click: dibujarConexionContradiccion
          },
          $(
            go.Shape,
            {
              geometryString: 'M0 0 L7 0 7 14 14 14 M12 14',
              stroke: 'red',
              strokeWidth: 1.5
            }
          )
        ),
        $(
          'Button',
          {
            click: eliminarNodoOConexion
          },
          $(
            go.TextBlock, 'X',
            {
              font: 'bold 13pt',
              stroke: 'red',
              desiredSize: new go.Size(15.5, 15.5),
              textAlign: 'center'
            }
          )
        ),
      )
    );

    function cambiarColor(evento, boton) {
      const nodo = boton.part.adornedPart;
      var forma = nodo.findObject('Nodo');
      if (forma === null) return;
      nodo.diagram.startTransaction('Cambiar color');
      forma.fill = siguienteColor(forma.fill);
      boton['_buttonFillNormal'] = siguienteColor(forma.fill);
      nodo.diagram.commitTransaction('Cambiar color');
    }

    function siguienteColor(color) {
      var indice = colores.indexOf(color);
      if (indice < 0) return 'lightgray';
      if (indice >= colores.length - 1) indice = 0;
      return colores[indice + 1];
    }

    function dibujarConexion(nodo, categoria) {
      const tool = diagramaEditable.toolManager.linkingTool;
      diagramaEditable.model.setCategoryForLinkData(tool.archetypeLinkData, categoria);
      tool.startObject = nodo.port;
      diagramaEditable.currentTool = tool;
      tool.doActivate();
    }

    function dibujarConexionCasualidad(evento, boton) {
      dibujarConexion(boton.part.adornedPart, 'Casualidad')
    }


    function dibujarConexionConfirmacion(evento, boton) {
      dibujarConexion(boton.part.adornedPart, 'Confirmación')
    }

    function dibujarConexionContradiccion(evento, boton) {
      dibujarConexion(boton.part.adornedPart, 'Contradicción')
    }

    return diagramaEditable;
  }

  public diagramNodeData = [
    {key: 'Nodo', loc: '-57.899993896484375 -164', text: 'Tema 1', descripcion: 'Sin descripcion', autor: 'Sin autor'},
    {key: 'Nodo2', loc: '39.100006103515625 -25', text: 'Tema 2', descripcion: 'Sin descripcion', autor: 'Sin autor'}
  ];
  public diagramLinkData = [
    {category: 'Casualidad', from: 'Nodo2', to: 'Nodo'}
  ];
  public diagramDivClassName: string = 'diagramaEditable';
}
