import {Component, OnInit} from '@angular/core';
import {BuscarSalasService} from '../../../../servicios/query/buscar-salas.service';
import {SalaInterface} from '../../../../interfaces/sala.interface';
import {Router} from '@angular/router';
import {BuscarUsuariosService} from '../../../../servicios/query/buscar-usuarios.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ModalCrearSalaComponent} from '../../modales/modal-crear-sala/modal-crear-sala/modal-crear-sala.component';
import {NuevaSalaService} from '../../../../servicios/subscription/nueva-sala.service';

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
    private readonly _buscarSalasService: BuscarSalasService,
    private readonly _router: Router,
    private readonly _buscarUsuarioService: BuscarUsuariosService,
    private readonly _nuevaSalaService: NuevaSalaService,
    public matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this._buscarSalasService
      .watch()
      .valueChanges
      .subscribe(
        respuestaQuerySalas => {
          this.estaCargando = respuestaQuerySalas.loading;
          this.salas = respuestaQuerySalas.data.salas;
          this.existenSalas = this.salas.length > 0;
        },
        error => {
          console.error({
            error,
            mensaje: 'Error buscando salas'
          });
        }
      );
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
