import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {LISTAR_SALAS} from '../../../../constantes/queries';

@Component({
  selector: 'app-ruta-listar-salas',
  templateUrl: './ruta-listar-salas.component.html',
  styleUrls: ['./ruta-listar-salas.component.css']
})
export class RutaListarSalasComponent implements OnInit {

  constructor(
    private readonly _apollo: Apollo
  ) { }

  ngOnInit(): void {
    this._apollo.watchQuery({
      query: LISTAR_SALAS
    }).valueChanges.subscribe(
      (salas) => {
        console.log('salas', salas);
      }
    )
  }
}
