import {Component, Input, OnInit} from '@angular/core';
import {AccionesUsuarioSalaService} from '../../../../../servicios/mutation/acciones-usuario-sala.service';
import {BuscarUsuariosEnSalaService} from '../../../../../servicios/query/buscar-usuarios-en-sala.service';

@Component({
  selector: 'app-pantalla-interactiva-usuario',
  templateUrl: './pantalla-interactiva-usuario.component.html',
  styleUrls: ['./pantalla-interactiva-usuario.component.css']
})
export class PantallaInteractivaUsuarioComponent implements OnInit {

  @Input()
  idSala: string;

  idUsuarioSala: string;

  constructor(
    private readonly _buscarUsuarioEnSalaService: BuscarUsuariosEnSalaService,
    private readonly _accionesUsuarioEnSalaService: AccionesUsuarioSalaService
  ) {
  }

  ngOnInit(): void {
    this.verificarUsuarioEnSala();
  }

  verificarUsuarioEnSala() {
    this._buscarUsuarioEnSalaService
      .watch({
        sala: this.idSala,
        usuario: localStorage.getItem('usuario')
      })
      .valueChanges
      .subscribe(
        respuestaQueryUsuarioSala => {
          this.idUsuarioSala = respuestaQueryUsuarioSala.data.usuarioSalas[0].id;
        },
        error => {
          console.error({
            error,
            mensaje: 'Error consultado usuarios en sala'
          })
        }
      );
  }

  pedirLaPalabra() {
    return this._accionesUsuarioEnSalaService
      .mutate({
        idUsuarioSala: this.idUsuarioSala,
        levantarMano: true,
        compartirPantalla: false
      })
      .subscribe(
        () => {
        },
        error => {
          console.error({
            error,
            mensaje: 'Error al pedir la palabra'
          })
        }
      );
  }

  compartirPantalla() {
    return this._accionesUsuarioEnSalaService
      .mutate({
        idUsuarioSala: this.idUsuarioSala,
        levantarMano: false,
        compartirPantalla: true
      })
      .subscribe(
        () => {
        },
        error => {
          console.error({
            error,
            mensaje: 'Error al compartir pantalla'
          })
        }
      );
  }

  cancelar() {
    return this._accionesUsuarioEnSalaService
      .mutate({
        idUsuarioSala: this.idUsuarioSala,
        levantarMano: false,
        compartirPantalla: false
      })
      .subscribe(
        () => {
        },
        error => {
          console.error({
            error,
            mensaje: 'Error al cancelar'
          })
        }
      );
  }

}
