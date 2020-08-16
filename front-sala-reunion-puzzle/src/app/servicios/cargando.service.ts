import { EventEmitter, Injectable } from '@angular/core';
import {CargandoServiceInterface} from '../interfaces/cargando-service.interface';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class CargandoService implements CargandoServiceInterface {
  estaCargando:boolean = false;

  cambioEstado: EventEmitter<boolean> = new EventEmitter();

  habilitarCargando() {
    this.estaCargando = true;
    this.cambioEstado.emit(true);
  }

  deshabilitarCargando() {
    setTimeout(() => {
      this.estaCargando = false;
      this.cambioEstado.emit(false);
    }, 250);
  }
}
