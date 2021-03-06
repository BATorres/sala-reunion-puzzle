import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-paleta',
  templateUrl: './paleta.component.html',
  styleUrls: ['./paleta.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PaletaComponent implements OnInit {

  @Input()
  paletteNodeData;

  paletteDivClassName = 'paleta';

  constructor() {
  }

  ngOnInit(): void {
  }

  crearPaleta(): go.Palette {
    const $ = go.GraphObject.make;
    const paleta = $(go.Palette);

    // define the Node template
    paleta.nodeTemplate = $(
      go.Node,
      'Horizontal',
      $(
        go.Shape,
        {
          fill: 'white',
          height: 30,
          width: 30
        }
      ),
      $(
        go.TextBlock,
        {
          margin: 8,
          stroke: 'white'
        },
        new go.Binding(
          'text',
          'titulo'
        )
      )
    );

    return paleta;
  }
}
