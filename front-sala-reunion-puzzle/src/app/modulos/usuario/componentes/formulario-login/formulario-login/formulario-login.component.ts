import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BuscarUsuariosService} from '../../../../../servicios/query/buscar-usuarios.service';
import {ToasterService} from 'angular2-toaster';
import {UsuarioInterface} from '../../../../../interfaces/usuario.interface';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit {

  formularioLogin: FormGroup;

  esUsuarioRegistrado: boolean;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _buscarUsuariosService: BuscarUsuariosService,
    private readonly _toasterService: ToasterService
  ) {
    const existeUsuarioLogeado: string = localStorage.getItem('usuario');
    if (existeUsuarioLogeado) {
      this.irMenuSalas();
    }
  }

  ngOnInit(): void {
    this.formularioLogin = this._formBuilder
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

  ingresarAlSistema() {
    const nombre: string = this.formularioLogin.get('nombre').value;
    const password: string = this.formularioLogin.get('password').value;

    this._buscarUsuariosService
      .watch({
        nombre: nombre,
        password: password
      })
      .valueChanges
      .subscribe(
        respuestaQueryBuscarUsuario => {
          this.esUsuarioRegistrado = respuestaQueryBuscarUsuario.data.usuarios.length > 0;
          if (this.esUsuarioRegistrado) {
            const usuarioLogeado: UsuarioInterface = respuestaQueryBuscarUsuario.data.usuarios[0];
            localStorage.setItem('usuario', usuarioLogeado.id);
            this.irMenuSalas();
          } else {
            this._toasterService.pop(
              'error',
              'ERROR',
              'Error en el nombre o contraseña'
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
