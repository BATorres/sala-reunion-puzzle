import {Component, OnInit} from '@angular/core';
import {CargandoService} from './servicios/cargando.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front-sala-reunion-puzzle';

  bloqueado = false;

  constructor(
    private readonly _cargandoService: CargandoService,
  ) {}

  ngOnInit(): void {
    this.escucharCambiosEnCargandoService();
  }

  escucharCambiosEnCargandoService(): void {
    this._cargandoService
      .cambioEstado
      .subscribe(
        (cambio: boolean) => {
          this.bloqueado = cambio;
        },
        error => {
          console.error({
            error,
            mensaje: 'Error escuchando cambios en cargando service'
          });
        }
      );
  }
}
