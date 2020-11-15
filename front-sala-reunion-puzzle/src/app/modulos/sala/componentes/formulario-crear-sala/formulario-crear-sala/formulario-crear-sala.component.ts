import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SalaInterface} from '../../../../../interfaces/sala.interface';
import {
  MENSAJES_VALIDACION_NOMBRE_SALA,
  VALIDACIONES_NOMBRE_SALA
} from '../../../constantes/validaciones-formulario-sala';

@Component({
  selector: 'app-formulario-crear-sala',
  templateUrl: './formulario-crear-sala.component.html',
  styleUrls: ['./formulario-crear-sala.component.css']
})
export class FormularioCrearSalaComponent implements OnInit {

  @Output()
  enviarRegistroValido: EventEmitter<SalaInterface | boolean> = new EventEmitter();

  formularioCrearSala: FormGroup;

  mensajesError = {
    nombre: []
  };

  constructor(
    private readonly _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.verificarCamposFormulario();
    this.verificarFormulario();
  }

  private inicializarFormulario(): void {
    this.formularioCrearSala = this._formBuilder
      .group({
        nombre: new FormControl(
          '',
          VALIDACIONES_NOMBRE_SALA,
        )
      });
  }

  private verificarCamposFormulario(): void {
    this.verificarCampoFormControl(
      'nombre',
      MENSAJES_VALIDACION_NOMBRE_SALA
    );
  }

  private verificarFormulario(): void {
    this.formularioCrearSala
      .valueChanges
      .subscribe(
        (valoresFormulario: SalaInterface) => {
          const esFormularioValido: boolean = this.formularioCrearSala.valid;
          if (esFormularioValido) {
            this.enviarRegistroValido.emit(valoresFormulario);
          } else {
            this.enviarRegistroValido.emit(false);
          }
        }
      );
  }

  verificarCampoFormControl(campo, mensajesValidacion): void {
    const nombreCampo: AbstractControl = this.formularioCrearSala.get(campo);
    nombreCampo
      .valueChanges
      .pipe()
      .subscribe(
        () => {
          const existenErrores = nombreCampo.errors;
          if (existenErrores) {
            const mensajesErrorCampo = Object.keys(
              nombreCampo.errors
            ).map(
              propiedad => {
                return mensajesValidacion[propiedad];
              }
            );
            this.mensajesError[campo] = mensajesErrorCampo;
          }
        },
        error => {
          console.error({
            error,
            mensaje: 'Error seteando los mensajes del formulario',
            data: {
              mensajes: mensajesValidacion
            }
          });
        }
      );
  }
}
