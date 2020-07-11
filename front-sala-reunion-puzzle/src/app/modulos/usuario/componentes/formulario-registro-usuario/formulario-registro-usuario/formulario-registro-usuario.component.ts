import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BuscarUsuariosService} from '../../../../../servicios/query/buscar-usuarios.service';
import {RegistrarUsuarioService} from '../../../../../servicios/mutation/registrar-usuario.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-formulario-registro-usuario',
  templateUrl: './formulario-registro-usuario.component.html',
  styleUrls: ['./formulario-registro-usuario.component.css']
})
export class FormularioRegistroUsuarioComponent implements OnInit {

  formularioRegistro: FormGroup;

  usuarioYaRegistrado: boolean;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _buscarUsuariosService: BuscarUsuariosService,
    private readonly _registrarUsuarioService: RegistrarUsuarioService,
    private readonly _toasterService: ToasterService
  ) {
    const existeUsuarioLogeado: string = localStorage.getItem('usuario');
    if (existeUsuarioLogeado) {
      this.irMenuSalas();
    }
  }

  ngOnInit(): void {
    this.formularioRegistro = this._formBuilder
      .group({
        nombre: new FormControl(
          '',
          [Validators.required],
        ),
        password: new FormControl(
          '',
          [Validators.required]
        )
      });
  }

  registrarUsuario() {
    const nombre: string = this.formularioRegistro.get('nombre').value;
    const password: string = this.formularioRegistro.get('password').value;

    this._buscarUsuariosService
      .watch({
        nombre: nombre,
        password: password
      })
      .valueChanges
      .subscribe(
        respuestaQueryBuscarUsuario => {
          this.usuarioYaRegistrado = respuestaQueryBuscarUsuario.data.usuarios.length > 0;

          if (this.usuarioYaRegistrado) {
            this._toasterService.pop(
              'warning',
              'CUIDADO',
              'El usuario ingresado ya se encuentra registrado'
            )
          } else {
            this._registrarUsuarioService
              .mutate({
                nombre: nombre,
                password: password
              })
              .subscribe(
                () => {
                  this._router.navigate(['login']);

                  this._toasterService.pop(
                    'success',
                    'ÉXITO',
                    'Usuario registrado exitosamente'
                  );
                },
                error => {
                  console.error({
                    error,
                    mensaje: 'Error registrando el nuevo usuario'
                  });
                  this._toasterService.pop(
                    'error',
                    'ERROR',
                    'Error registrando el usuario'
                  );
                }
              )
          }
        },
        error => {
          console.error({
            error,
            mensaje: 'Error registrando nuevo usuario'
          });
        }
      );
  }

  volverMenuInicio() {
    this._router.navigate(['/']);
  }

  irMenuSalas() {
    this._router.navigate(['listar-salas']);
  }
}
