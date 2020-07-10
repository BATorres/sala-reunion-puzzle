import {Component, OnInit} from '@angular/core';
import {BuscarSalasService} from '../../../../servicios/query/buscar-salas.service';

@Component({
  selector: 'app-ruta-listar-salas',
  templateUrl: './ruta-listar-salas.component.html',
  styleUrls: ['./ruta-listar-salas.component.css']
})
export class RutaListarSalasComponent implements OnInit {

  constructor(
    private readonly _buscarSalasService: BuscarSalasService,
  ) {
  }

  ngOnInit(): void {
    this._buscarSalasService
      .watch()
      .valueChanges
      .subscribe(
        (salas) => {
          console.log('salas', salas)
        }
      )
  }
}
