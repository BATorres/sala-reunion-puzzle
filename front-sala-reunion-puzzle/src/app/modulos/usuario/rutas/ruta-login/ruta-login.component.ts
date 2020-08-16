import { Component, OnInit } from '@angular/core';
import {UsuarioInterface} from '../../../../interfaces/usuario.interface';
import {Router} from '@angular/router';
import {BuscarUsuariosService} from '../../../../servicios/query/buscar-usuarios.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-ruta-login',
  templateUrl: './ruta-login.component.html',
  styleUrls: ['./ruta-login.component.css']
})
export class RutaLoginComponent implements OnInit {

  formularioValido: boolean;

  esUsuarioYaRegistrado: boolean;

  usuarioALoguearse: UsuarioInterface;

  constructor(
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
  }

  validarFormulario(usuario: UsuarioInterface) {
    const reciboDatosUsuario = usuario;
    if (reciboDatosUsuario) {
      this.formularioValido = true;
      this.usuarioALoguearse = usuario;
    } else {
      this.formularioValido = false;
    }
  }

  ingresarAlSistema() {
    this._buscarUsuariosService
      .watch({
        nombre: this.usuarioALoguearse.nombre,
        password: this.usuarioALoguearse.password
      })
      .valueChanges
      .subscribe(
        respuestaQueryBuscarUsuario => {
          this.esUsuarioYaRegistrado = respuestaQueryBuscarUsuario.data.usuarios.length > 0;
          if (this.esUsuarioYaRegistrado) {
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
