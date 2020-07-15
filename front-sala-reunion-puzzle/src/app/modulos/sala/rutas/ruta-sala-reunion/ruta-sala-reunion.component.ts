import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BuscarUsuariosService} from '../../../../servicios/query/buscar-usuarios.service';
import {BuscarUsuariosEnSalaService} from '../../../../servicios/query/buscar-usuarios-en-sala.service';
import {UnirseSalaService} from '../../../../servicios/mutation/unirse-sala.service';
import {AccionesUsuarioSalaService} from '../../../../servicios/mutation/acciones-usuario-sala.service';
import {BuscarSalasService} from '../../../../servicios/query/buscar-salas.service';

@Component({
  selector: 'app-ruta-sala-reunion',
  templateUrl: './ruta-sala-reunion.component.html',
  styleUrls: ['./ruta-sala-reunion.component.css']
})
export class RutaSalaReunionComponent implements OnInit {

  idSala: string;

  esAdmin: boolean;

  existeUsuarioEnSala: boolean;

  nombreSala: string;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _buscarUsuarioService: BuscarUsuariosService,
    private readonly _buscarUsuarioEnSalaService: BuscarUsuariosEnSalaService,
    private readonly _unirseASalaService: UnirseSalaService,
    private readonly _accionesUsuarioEnSalaService: AccionesUsuarioSalaService,
    private readonly _buscarSalasService: BuscarSalasService
  ) {
  }

  ngOnInit(): void {
    this._activatedRoute
      .params
      .subscribe(
        parametrosRuta => {
          this.idSala = parametrosRuta.idSala;
          this.verificarRolUsuario();
          this.setearNombreSala();
        },
        error => {
          console.error({
            error,
            mensaje: 'Error cargando los parámetros de ruta'
          })
        }
      );
    this.verificarUsuarioEnSala();
  }

  verificarRolUsuario() {
    this._buscarUsuarioService
      .watch({
        id: localStorage.getItem('usuario')
      })
      .valueChanges
      .subscribe(
        respuestaQueryBuscarUsuario => {
          this.esAdmin = respuestaQueryBuscarUsuario.data.usuarios[0].esAdmin;
        },
        error => {
          console.error({
            error,
            mensaje: 'Error verificando rol de usuario'
          });
        }
      );
  }

  verificarUsuarioEnSala() {
    this._buscarUsuarioEnSalaService
      .watch({
        sala: this.idSala,
        usuario: localStorage.getItem('usuario')
      })
      .valueChanges
      .subscribe(
        ({data}) => {
          this.existeUsuarioEnSala = data.usuarioSalas.length > 0;

          if (!this.esAdmin) {
            if (!this.existeUsuarioEnSala) {
              this.unirseASala();
            } else {
              const idUsuarioEnSala: string = data.usuarioSalas[0].id;
              this.resetearAccionesUsuario(idUsuarioEnSala)
            }
          }
        },
        error => {
          console.error({
            error,
            mensaje: 'Error consultado usuarios en sala'
          })
        }
      );
  }

  setearNombreSala() {
    return this._buscarSalasService
      .watch({
        id: this.idSala
      })
      .valueChanges
      .subscribe(
        ({data}) => {
          this.nombreSala = data.salas[0].nombre;
        },
        error => {
          console.error({
            error,
            mensaje: 'Error buscando sala'
          })
        }
      );
  }

  unirseASala() {
    return this._unirseASalaService
      .mutate({
        idSala: this.idSala,
        idUsuario: localStorage.getItem('usuario')
      })
      .subscribe(
        () => {
        },
        error => {
          console.error({
            error,
            mensaje: 'Error uniendo usuario en sala'
          })
        }
      )
  }

  resetearAccionesUsuario(idUsuarioSala: string) {
    return this._accionesUsuarioEnSalaService
      .mutate({
        idUsuarioSala: idUsuarioSala,
        levantarMano: false,
        compartirPantalla: false
      })
      .subscribe(
        () => {
        },
        error => {
          console.error({
            error,
            mensaje: 'Error reseteando acciones usuario'
          })
        }
      )
  }
}
