import {Component, Inject, OnInit} from '@angular/core';
import {SalaInterface} from '../../../../../interfaces/sala.interface';
import {CrearSalaService} from '../../../../../servicios/mutation/crear-sala.service';
import {ToasterService} from 'angular2-toaster';
import {MatDialogRef} from '@angular/material/dialog';

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
    private readonly _crearSalaService: CrearSalaService,
    private readonly _toasterService: ToasterService
  ) { }

  ngOnInit(): void {
  }

  validarFormulario(sala: SalaInterface) {
    const reciboNoticia = sala;
    if (reciboNoticia) {
      this.salaACrear = sala;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  crearSala() {
    this._crearSalaService
      .mutate({
        nombre: this.salaACrear.nombre,
        descripcion: this.salaACrear.descripcion
      })
      .subscribe(
        () => {
          this.matDialog.close(this.salaACrear);
          this._toasterService.pop(
            'success',
            'ÉXITO',
            'Sala creada exitosamente'
          );
        },
        error => {
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
