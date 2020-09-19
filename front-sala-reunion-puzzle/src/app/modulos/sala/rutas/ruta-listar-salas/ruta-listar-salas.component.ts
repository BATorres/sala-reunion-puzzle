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

  constructor(
    private readonly router: Router,
    private readonly nuevaSalaService: NuevaSalaService,
    private readonly salaService: SalaService,
    private readonly usuarioService: UsuarioService,
    private readonly cargandoService: CargandoService,
    public matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.cargarSalas();
    this.nuevaSalaService
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
          });
        }
      );
    this.verificarRolUsuario();
  }

  cargarSalas(): void {
    this.cargandoService.habilitarCargando();
    this.salaService
      .findAll()
      .subscribe(
        (respuestaQuerySalas: {salas: SalaInterface[]}) => {
          this.cargandoService.deshabilitarCargando();
          this.salas = respuestaQuerySalas.salas;
          this.existenSalas = this.salas.length > 0;
        },
        error => {
          this.cargandoService.deshabilitarCargando();
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
      this.salaService
        .buscarPorNombre(busqueda.trim())
        .subscribe(
          (respuestaQuerySalas: {salas: SalaInterface[]}) => {
            this.cargandoService.deshabilitarCargando();
            this.salas = respuestaQuerySalas.salas;
            this.existenSalas = this.salas.length > 0;
          },
          error => {
            this.cargandoService.deshabilitarCargando();
            console.error({
              error,
              mensaje: 'Error buscando salas'
            });
          }
        );
    }
  }

  verificarRolUsuario(): void {
    this.usuarioService
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
    this.router
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
