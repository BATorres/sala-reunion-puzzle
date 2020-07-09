import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ruta-no-encontrada',
  templateUrl: './ruta-no-encontrada.component.html',
  styleUrls: ['./ruta-no-encontrada.component.css']
})
export class RutaNoEncontradaComponent implements OnInit {

  constructor(
    private readonly _router: Router
  ) { }

  ngOnInit(): void {
  }

  irARutaAnterior() {
    window.history.back();
  }

  irAMenuPrincipal() {
    this._router.navigate(['/']);
  }
}
