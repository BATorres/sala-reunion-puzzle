import {Component, Input, OnInit} from '@angular/core';
import {faHandPaper, faSatelliteDish} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pantalla-interactiva-usuario',
  templateUrl: './pantalla-interactiva-usuario.component.html',
  styleUrls: ['./pantalla-interactiva-usuario.component.css']
})
export class PantallaInteractivaUsuarioComponent implements OnInit {

  @Input()
  idSala: string;

  iconoLevantarMano = faHandPaper;

  icononoCompartirPantalla = faSatelliteDish;

  constructor() {
  }

  ngOnInit(): void {
  }

  pedirLaPalabra() {

  }

  compartirPantalla() {

  }

}
