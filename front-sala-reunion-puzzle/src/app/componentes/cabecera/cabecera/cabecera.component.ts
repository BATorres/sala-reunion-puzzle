import {Component, Input, OnInit} from '@angular/core';
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

  @Input()
  usuario: UsuarioInterface;

  constructor(
    private readonly _router: Router,
  ) {}

  ngOnInit(): void {
  }

  salir(): void {
    localStorage.removeItem('usuario');
    this._router.navigate(['/']);
  }
}
