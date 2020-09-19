import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {UsuarioInterface} from '../../../../interfaces/usuario.interface';
import {UsuarioService} from '../../../../servicios/usuario.service';

@Component({
  selector: 'app-ruta-registrar-usuario',
  templateUrl: './ruta-registrar-usuario.component.html',
  styleUrls: ['./ruta-registrar-usuario.component.css']
})
export class RutaRegistrarUsuarioComponent implements OnInit {

  formularioValido: boolean;

  esUsuarioYaRegistrado: boolean;

  usuarioARegistrar: UsuarioInterface;

  constructor(
    private readonly _router: Router,
    private readonly _usuarioService: UsuarioService,
    private readonly _toasterService: ToasterService
  ) {
    const existeUsuarioLogeado: string = localStorage.getItem('usuario');
    if (existeUsuarioLogeado) {
      this.irMenuSalas();
    }
  }

  ngOnInit(): void {
  }

  validarFormulario(usuario: UsuarioInterface): void {
    const reciboDatosUsuario = usuario;
    if (reciboDatosUsuario) {
      this.formularioValido = true;
      this.usuarioARegistrar = usuario;
    } else {
      this.formularioValido = false;
    }
  }

  registrarUsuario(): void {
    this._usuarioService
      .findAll(
        this.usuarioARegistrar.nombre,
        this.usuarioARegistrar.password
      )
      .subscribe((usuarioRegistrado: { usuarios: UsuarioInterface[] }) => {
          this.esUsuarioYaRegistrado = usuarioRegistrado.usuarios.length > 0;

          if (this.esUsuarioYaRegistrado) {
            this._toasterService.pop(
              'warning',
              'CUIDADO',
              'El usuario ingresado ya se encuentra registrado'
            );
          } else {
            this._usuarioService
              .registrarUsuario(
                this.usuarioARegistrar.nombre,
                this.usuarioARegistrar.password
              )
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
    this._router.navigate(['listar-salas']);
  }
}
