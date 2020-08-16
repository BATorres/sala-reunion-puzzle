import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BuscarUsuariosService} from '../../../../servicios/query/buscar-usuarios.service';
import {RegistrarUsuarioService} from '../../../../servicios/mutation/registrar-usuario.service';
import {ToasterService} from 'angular2-toaster';
import {UsuarioInterface} from '../../../../interfaces/usuario.interface';

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
  }

  validarFormulario(usuario: UsuarioInterface) {
    const reciboDatosUsuario = usuario;
    if (reciboDatosUsuario) {
      this.formularioValido = true;
      this.usuarioARegistrar = usuario;
    } else {
      this.formularioValido = false;
    }
  }

  registrarUsuario() {
    this._buscarUsuariosService
      .watch({
        nombre: this.usuarioARegistrar.nombre,
        password: this.usuarioARegistrar.password
      })
      .valueChanges
      .subscribe(
        respuestaQueryBuscarUsuario => {
          this.esUsuarioYaRegistrado = respuestaQueryBuscarUsuario.data.usuarios.length > 0;

          if (this.esUsuarioYaRegistrado) {
            this._toasterService.pop(
              'warning',
              'CUIDADO',
              'El usuario ingresado ya se encuentra registrado'
            )
          } else {
            this._registrarUsuarioService
              .mutate({
                nombre: this.usuarioARegistrar.nombre,
                password: this.usuarioARegistrar.password
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
