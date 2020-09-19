import {Component, OnInit} from '@angular/core';
import {SalaInterface} from '../../../../../interfaces/sala.interface';
import {ToasterService} from 'angular2-toaster';
import {MatDialogRef} from '@angular/material/dialog';
import {SalaService} from '../../../../../servicios/sala.service';
import {CargandoService} from '../../../../../servicios/cargando.service';

@Component({
  selector: 'app-modal-crear-sala',
  templateUrl: './modal-crear-sala.component.html',
  styleUrls: ['./modal-crear-sala.component.css']
})
export class ModalCrearSalaComponent implements OnInit {

  formularioValido: boolean;

  salaACrear: SalaInterface;

  constructor(
    public matDialog: MatDialogRef<ModalCrearSalaComponent>,
    private readonly _toasterService: ToasterService,
    private readonly _salaService: SalaService,
    private readonly _cargandoService: CargandoService
  ) { }

  ngOnInit(): void {
  }

  validarFormulario(sala: SalaInterface): void {
    const reciboDatosSala = sala;
    if (reciboDatosSala) {
      this.salaACrear = sala;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  crearSala(): void {
    this._cargandoService.habilitarCargando();
    this._salaService
      .crearSala(this.salaACrear.nombre)
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
          this.matDialog.close(this.salaACrear);
          this._toasterService.pop(
            'success',
            'ÉXITO',
            'Sala creada exitosamente'
          );
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error,
            mensaje: 'Error creando la nueva sala'
          });
          this._toasterService.pop(
            'error',
            'ERROR',
            'Error creando la nueva sala'
          );
        }
      );
  }
}
