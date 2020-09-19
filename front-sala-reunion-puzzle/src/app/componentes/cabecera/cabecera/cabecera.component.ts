import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UsuarioService} from '../../../servicios/usuario.service';
import {CargandoService} from '../../../servicios/cargando.service';
import {UsuarioInterface} from '../../../interfaces/usuario.interface';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  estaLogueado: boolean;

  usuario: string;

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly router: Router,
    private readonly cargandoService: CargandoService
  ) {}

  ngOnInit(): void {
    this.setearUsuario();
  }

  setearUsuario(): void {
    const usuarioLogueado = localStorage.getItem('usuario');
    if (usuarioLogueado) {
      this.usuarioService
        .findOne(usuarioLogueado)
        .subscribe(
          (usuarioEncontrado: {usuario: UsuarioInterface}) => {
            this.usuario = usuarioEncontrado.usuario.nombre;
            this.estaLogueado = true;
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

  salir(): void {
    localStorage.removeItem('usuario');
    this.estaLogueado = false;
    this.router.navigate(['/']);
  }
}
