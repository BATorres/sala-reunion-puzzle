import { Component, OnInit } from '@angular/core';
import {UsuarioInterface} from '../../interfaces/usuario.interface';
import {UsuarioService} from '../../servicios/usuario.service';

@Component({
  selector: 'app-ruta-app',
  templateUrl: './ruta-app.component.html',
  styleUrls: ['./ruta-app.component.css']
})
export class RutaAppComponent implements OnInit {

  usuario: UsuarioInterface;

  constructor(
    private readonly _usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.setearUsuario();
  }

  setearUsuario(): void {
    const usuarioLogeado = localStorage.getItem('usuario');
    if (usuarioLogeado) {
      this._usuarioService
        .findOne(usuarioLogeado)
        .subscribe(
          (usuarioEncontrado: {usuario: UsuarioInterface}) => {
            this.usuario = usuarioEncontrado.usuario;
            this._usuarioService.evenEmmiterUsuario.emit(this.usuario);
          },
          error => {
            console.error({
              error,
              mensaje: 'Error buscando usuario'
            });
          }
        );
    }
  }
}
