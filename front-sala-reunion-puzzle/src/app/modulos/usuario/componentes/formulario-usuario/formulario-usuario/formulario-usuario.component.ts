import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {
  MENSAJES_VALIDACION_NOMBRE_USUARIO, MENSAJES_VALIDACION_PASSWORD_USUARIO,
  VALIDACIONES_NOMBRE_USUARIO,
  VALIDACIONES_PASSWORD_USUARIO
} from '../../../constantes/validaciones-formulario-usuario';
import {UsuarioInterface} from '../../../../../interfaces/usuario.interface';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent implements OnInit {

  @Output()
  enviarRegistroValido: EventEmitter<UsuarioInterface | boolean> = new EventEmitter();

  formularioUsuario: FormGroup;

  mensajesError = {
    nombre: [],
    password: []
  };

  constructor(
    private readonly _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.verificarCamposFormulario();
    this.verificarFormulario();
  }

  private inicializarFormulario() {
    this.formularioUsuario = this._formBuilder
      .group({
        nombre: new FormControl(
          '',
          VALIDACIONES_NOMBRE_USUARIO,
        ),
        password: new FormControl(
          '',
          VALIDACIONES_PASSWORD_USUARIO
        )
      });
  }

  private verificarCamposFormulario() {
    this.verificarCampoFormControl(
      'nombre',
      MENSAJES_VALIDACION_NOMBRE_USUARIO
    );
    this.verificarCampoFormControl(
      'password',
      MENSAJES_VALIDACION_PASSWORD_USUARIO
    )
  }

  private verificarFormulario() {
    this.formularioUsuario
      .valueChanges
      .subscribe(
        (valoresFormulario: UsuarioInterface) => {
          const esFormularioValido: boolean = this.formularioUsuario.valid;
          if (esFormularioValido) {
            this.enviarRegistroValido.emit(valoresFormulario);
          } else {
            this.enviarRegistroValido.emit(false);
          }
        }
      )
  }

  verificarCampoFormControl(campo, mensajesValidacion) {
    const nombreCampo: AbstractControl = this.formularioUsuario.get(campo);
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
          })
        }
      );
  }
}
