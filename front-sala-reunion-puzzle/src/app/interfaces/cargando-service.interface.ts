import {EventEmitter} from '@angular/core';

export interface CargandoServiceInterface {
  estaCargando;

  cambioEstado: EventEmitter<boolean>;

  habilitarCargando(): void;

  deshabilitarCargando(): void;
}
