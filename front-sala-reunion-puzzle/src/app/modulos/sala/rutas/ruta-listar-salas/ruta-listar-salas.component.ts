import {Component, OnInit} from '@angular/core';
import {SalaInterface} from '../../../../interfaces/sala.interface';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ModalCrearSalaComponent} from '../../modales/modal-crear-sala/modal-crear-sala/modal-crear-sala.component';
import {NuevaSalaService} from '../../../../servicios/subscription/nueva-sala.service';
import {SalaService} from '../../../../servicios/sala.service';
import {CargandoService} from '../../../../servicios/cargando.service';
import {UsuarioService} from '../../../../servicios/usuario.service';

@Component({
  selector: 'app-ruta-listar-salas',
  templateUrl: './ruta-listar-salas.component.html',
  styleUrls: ['./ruta-listar-salas.component.css']
})
export class RutaListarSalasComponent implements OnInit {

  esAdmin: boolean;

  salas: SalaInterface[];

  existenSalas: boolean;

  idUsuarioEnSala: string;

  constructor(
    private readonly _router: Router,
    private readonly _nuevaSalaService: NuevaSalaService,
    private readonly _salaService: SalaService,
    private readonly _usuarioService: UsuarioService,
    private readonly _cargandoService: CargandoService,
    public matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.cargarSalas();
    this.escucharNuevaSala();
    this.verificarRolUsuario();
  }

  escucharNuevaSala(): void {
    this._nuevaSalaService
      .subscribe()
      .subscribe(
        ({data}) => {
          const nuevaSala: SalaInterface = data.sala.node;
          this.existenSalas = true;
          this.salas.unshift(nuevaSala);
        },
        error => {
          console.error({
            error,
            mensaje: 'Error con el subscriptor de salas'
          });
        }
      );
  }

  cargarSalas(): void {
    this._cargandoService.habilitarCargando();
    this._salaService
      .findAll()
      .subscribe(
        (respuestaQuerySalas: { salas: SalaInterface[] }) => {
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

  buscarSala(busqueda: string): void {
    const esBusquedaVacia: boolean = busqueda === '';
    if (esBusquedaVacia) {
      this.cargarSalas();
    } else {
      this._salaService
        .buscarPorNombre(busqueda.trim())
        .subscribe(
          (respuestaQuerySalas: { salas: SalaInterface[] }) => {
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

  verificarRolUsuario(): void {
    this._usuarioService
      .verificarEsAdmin(localStorage.getItem('usuario'))
      .subscribe(
        esUsuarioAdmin => {
          this.esAdmin = esUsuarioAdmin;
        },
        error => {
          console.error({
            error,
            mensaje: 'Error verificando rol de usuario'
          });
        }
      );
  }

  abrirModalCrearSala(): void {
    const dialogRef: MatDialogRef<ModalCrearSalaComponent> = this.matDialog.open(
      ModalCrearSalaComponent,
      {
        width: '500px'
      }
    );
    dialogRef.afterClosed();
  }

  irASala(idSala: string): void {
    this._router
      .navigate(
        [
          `/app/sala-reunion/${idSala}`
        ], {
          state: {
            esAdmin: this.esAdmin,
            idUsuarioSala: this.idUsuarioEnSala
          }
        }
      );
  }
}
