import {Component, Input, OnInit} from '@angular/core';
import {BuscarUsuariosEnSalaService} from '../../../../../servicios/query/buscar-usuarios-en-sala.service';
import {UsuarioSalaInterface} from '../../../../../interfaces/usuario-sala.interface';

@Component({
  selector: 'app-pantalla-interactiva-administrador',
  templateUrl: './pantalla-interactiva-administrador.component.html',
  styleUrls: ['./pantalla-interactiva-administrador.component.css']
})
export class PantallaInteractivaAdministradorComponent implements OnInit {

  @Input()
  idSala: string;

  estaCargando: boolean = true;

  existenUsuariosEnSala: boolean;

  usuariosEnSala: UsuarioSalaInterface[];

  constructor(
    private readonly _buscarUsuariosEnSalaService: BuscarUsuariosEnSalaService
  ) {
  }

  ngOnInit(): void {
    this._buscarUsuariosEnSalaService
      .watch({
        idSala: this.idSala
      })
      .valueChanges
      .subscribe(
        respuestaQueryUsuarioSala => {
          this.estaCargando = respuestaQueryUsuarioSala.loading;
          this.usuariosEnSala = respuestaQueryUsuarioSala.data.usuarioSalas;
          this.existenUsuariosEnSala = this.usuariosEnSala.length > 0;
        }
      )
  }
}
