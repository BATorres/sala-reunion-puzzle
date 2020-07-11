import {Component, OnInit} from '@angular/core';
import {BuscarSalasService} from '../../../../servicios/query/buscar-salas.service';
import {SalaInterface} from '../../../../interfaces/sala.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ruta-listar-salas',
  templateUrl: './ruta-listar-salas.component.html',
  styleUrls: ['./ruta-listar-salas.component.css']
})
export class RutaListarSalasComponent implements OnInit {

  cargando: boolean = true;

  salas: SalaInterface[];

  constructor(
    private readonly _buscarSalasService: BuscarSalasService,
    private readonly _router: Router,
  ) {
  }

  ngOnInit(): void {
    this._buscarSalasService
      .watch()
      .valueChanges
      .subscribe(
        (respuestaQuerySalas) => {
          this.cargando = respuestaQuerySalas.loading;
          this.salas = respuestaQuerySalas.data.salas;
        }
      )
  }

  irASala(idSala: string) {
    this._router
      .navigate(
        [
          `/sala-reunion/${idSala}`
        ]
      );
  }
}
