import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pantalla-interactiva-usuario',
  templateUrl: './pantalla-interactiva-usuario.component.html',
  styleUrls: ['./pantalla-interactiva-usuario.component.css']
})
export class PantallaInteractivaUsuarioComponent implements OnInit {

  @Input()
  idSala: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  pedirLaPalabra() {

  }

  compartirPantalla() {

  }

}
