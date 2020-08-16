import { Component, OnInit } from '@angular/core';
import {BuscarUsuariosService} from '../../../servicios/query/buscar-usuarios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  estaLogueado: boolean = false;

  usuario: string;

  constructor(
    private readonly _buscarUsuarioService: BuscarUsuariosService,
    private readonly _router: Router
  ) { }

  ngOnInit(): void {
    this._buscarUsuarioService
      .watch({
        id: localStorage.getItem('usuario')
      })
      .valueChanges
      .subscribe(
        ({data}) => {
          this.usuario = data.usuarios[0].nombre;
          this.estaLogueado = true;
        },
        error => {
          console.error({
            error,
            mensaje: 'Error buscando usuario'
          })
        }
      );
  }

  salir() {
    localStorage.removeItem('usuario');
    this.estaLogueado = false;
    this._router.navigate(['/']);
  }
}
