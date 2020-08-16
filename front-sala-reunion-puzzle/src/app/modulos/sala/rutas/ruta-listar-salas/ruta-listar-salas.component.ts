import {Component, OnInit} from '@angular/core';
import {SalaInterface} from '../../../../interfaces/sala.interface';
import {Router} from '@angular/router';
import {BuscarUsuariosService} from '../../../../servicios/query/buscar-usuarios.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ModalCrearSalaComponent} from '../../modales/modal-crear-sala/modal-crear-sala/modal-crear-sala.component';
import {NuevaSalaService} from '../../../../servicios/subscription/nueva-sala.service';
import {SalaService} from '../../../../servicios/sala.service';
import {CargandoService} from '../../../../servicios/cargando.service';

@Component({
  selector: 'app-ruta-listar-salas',
  templateUrl: './ruta-listar-salas.component.html',
  styleUrls: ['./ruta-listar-salas.component.css']
})
export class RutaListarSalasComponent implements OnInit {

  estaCargando: boolean = true;

  esAdmin: boolean;

  salas: SalaInterface[];

  existenSalas: boolean;

  constructor(
    private readonly _router: Router,
    private readonly _buscarUsuarioService: BuscarUsuariosService,
    private readonly _nuevaSalaService: NuevaSalaService,
    private readonly _salaService: SalaService,
    private readonly _cargandoService: CargandoService,
    public matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.cargarSalas();
    this._nuevaSalaService
      .subscribe()
      .subscribe(
        ({data}) => {
          const nuevaSala: SalaInterface = data.sala.node;
          this.salas.unshift(nuevaSala);
        },
        error => {
          console.error({
            error,
            mensaje: 'Error con el subscriptor de salas'
          })
        }
      );
    this.verificarRolUsuario();
  }

  cargarSalas() {
    this._cargandoService.habilitarCargando();
    this._salaService
      .findAll()
      .subscribe(
        (respuestaQuerySalas: {salas: SalaInterface[]}) => {
          this._cargandoService.deshabilitarCargando();
          this.salas = respuestaQuerySalas.salas;
          this.existenSalas = this.salas.length > 0;
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error,
            mensaje: 'Error buscando salas'
          });
        }
      );
  }

  buscarSala(busqueda: string) {
    const esBusquedaVacia: boolean = busqueda === '';
    if (esBusquedaVacia) {
      this.cargarSalas();
    } else {
      this._salaService
        .buscarPorNombre(busqueda.trim())
        .subscribe(
          (respuestaQuerySalas: {salas: SalaInterface[]}) => {
            this._cargandoService.deshabilitarCargando();
            this.salas = respuestaQuerySalas.salas;
            this.existenSalas = this.salas.length > 0;
          },
          error => {
            this._cargandoService.deshabilitarCargando();
            console.error({
              error,
              mensaje: 'Error buscando salas'
            });
          }
        );
    }
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

  abrirModalCrearSala() {
    const dialogRef: MatDialogRef<ModalCrearSalaComponent> = this.matDialog.open(
      ModalCrearSalaComponent,
      {
        width: '500px'
      }
    );
    dialogRef.afterClosed();
  }

  irASala(idSala: string) {
    this._router
      .navigate(
        [
          `/sala-reunion/${idSala}`
        ], {
          state: {
            esAdmin: this.esAdmin
          }
        }
      );
  }
}
