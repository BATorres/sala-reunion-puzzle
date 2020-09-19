import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as go from 'gojs';
import {COLORES} from '../../../constantes/colores';
import {crearNodo} from '../../../funciones/crear-nodo';
import {crearGrupo} from '../../../funciones/crear-grupo';
import {crearConexion} from '../../../funciones/crear-conexion';
import {crearCausalidad} from '../../../funciones/crear-causalidad';
import {crearConfirmacion} from '../../../funciones/crear-confirmacion';
import {crearContradiccion} from '../../../funciones/crear-contradiccion';
import {nodoExpandido} from '../../../funciones/nodo-expandido';

export let diagramaGlobal;

@Component({
  selector: 'app-diagrama-global',
  templateUrl: './diagrama-global.component.html',
  styleUrls: ['./diagrama-global.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DiagramaGlobalComponent implements OnInit {

  diagramNodeData = [
    {key: 'Nodo', loc: '-57.899993896484375 -164', text: 'Tema 1', autor: 'Sin autor'},
    {key: 'Nodo2', loc: '39.100006103515625 -25', text: 'Tema 2', autor: 'Sin autor'}
  ];

  diagramLinkData = [
    {category: 'Casualidad', from: 'Nodo2', to: 'Nodo'}
  ];

  diagramDivClassName = 'diagramaGlobal';

  constructor() {
  }

  ngOnInit(): void {
  }

  crearDiagramaGlobal(): go.Diagram {
    const $ = go.GraphObject.make;
    const colores = COLORES;
    diagramaGlobal = $(
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

    diagramaGlobal.isReadOnly = true;

    // creación de nodos
    const configuracionesNodo = new go.Map();
    configuracionesNodo.add('simple', crearNodo($));
    configuracionesNodo.add('expandido', nodoExpandido($));
    diagramaGlobal.nodeTemplateMap = configuracionesNodo;

    diagramaGlobal.nodeTemplate = configuracionesNodo.get('simple');

    // creación de grupos
    diagramaGlobal.groupTemplate = crearGrupo($);

    // creación de distintos tipos de enlaces
    diagramaGlobal.linkTemplate = crearConexion($);
    diagramaGlobal.linkTemplateMap.add(
      'Casualidad',
      crearCausalidad($)
    );
    diagramaGlobal.linkTemplateMap.add(
      'Confirmación',
      crearConfirmacion($)
    );
    diagramaGlobal.linkTemplateMap.add(
      'Contradicción',
      crearContradiccion($)
    );

    return diagramaGlobal;
  }
}
