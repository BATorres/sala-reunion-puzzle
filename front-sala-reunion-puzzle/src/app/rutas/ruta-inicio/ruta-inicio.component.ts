import { Component, OnInit } from '@angular/core';
import {BuscarUsuariosService} from '../../servicios/query/buscar-usuarios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ruta-inicio',
  templateUrl: './ruta-inicio.component.html',
  styleUrls: ['./ruta-inicio.component.css']
})
export class RutaInicioComponent implements OnInit {

  cargando: boolean = true;

  constructor(
    private readonly _router: Router,
    private readonly _buscarUsuario: BuscarUsuariosService,
  ) { }

  ngOnInit(): void {
    this._buscarUsuario.watch({nombre: 'Wendy'}).valueChanges.subscribe(
      (usuario) => {
        this.cargando = usuario.loading;
        console.log('usuario', usuario)
      }
    );
  }

  irARegistrarUsuario() {
    this._router.navigate(['registrarse'])
  }

  irALogin() {
    this._router.navigate(['login'])
  }

}
