import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ruta-sala-reunion',
  templateUrl: './ruta-sala-reunion.component.html',
  styleUrls: ['./ruta-sala-reunion.component.css']
})
export class RutaSalaReunionComponent implements OnInit {

  idSala: string;

  esAdmin: boolean;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this._activatedRoute
      .params
      .subscribe(
        parametrosRuta => {
          this.idSala = parametrosRuta.idSala;
          this.esAdmin = history.state.esAdmin;
        },
        error => {
          console.error({
            error,
            mensaje: 'Error cargando los parámetros de ruta'
          })
        }
      );
  }
}
