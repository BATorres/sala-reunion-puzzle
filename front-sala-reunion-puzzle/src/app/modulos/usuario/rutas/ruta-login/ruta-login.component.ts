import {Component, OnInit} from '@angular/core';
import {UsuarioInterface} from '../../../../interfaces/usuario.interface';
import {Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {UsuarioService} from '../../../../servicios/usuario.service';

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
    private readonly _usuarioService: UsuarioService,
    private readonly _toasterService: ToasterService,
  ) {
    const existeUsuarioLogeado: string = localStorage.getItem('usuario');
    if (existeUsuarioLogeado) {
      this.irMenuSalas();
    }
  }

  ngOnInit(): void {
  }

  validarFormulario(usuario: UsuarioInterface): void {
    const reciboDatosUsuario = usuario.nombre !== '' && usuario.password !== '';
    if (reciboDatosUsuario) {
      this.formularioValido = true;
      this.usuarioALoguearse = usuario;
    } else {
      this.formularioValido = false;
    }
  }

  ingresarAlSistema(): void {
    this._usuarioService
      .findAll(
        this.usuarioALoguearse.nombre,
        this.usuarioALoguearse.password
      )
      .subscribe(
        (usuario: { usuarios: UsuarioInterface[] }) => {
          this.esUsuarioYaRegistrado = usuario.usuarios.length > 0;

          if (this.esUsuarioYaRegistrado) {
            const usuarioLogeado: UsuarioInterface = usuario.usuarios[0];
            localStorage.setItem('usuario', usuarioLogeado.id);
            this.irMenuSalas();
          } else {
            this._toasterService.pop(
              'error',
              'ERROR',
              'Error en el nombre o contraseña'
            );
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

  volverMenuInicio(): void {
    this._router.navigate(['/']);
  }

  irMenuSalas(): void {
    this._router.navigate(['/app', 'listar-salas']);
  }
}
