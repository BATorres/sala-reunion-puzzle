import {Component, OnInit} from '@angular/core';
import {BuscarSalasService} from '../../../../servicios/query/buscar-salas.service';
import {SalaInterface} from '../../../../interfaces/sala.interface';
import {Router} from '@angular/router';
import {BuscarUsuariosService} from '../../../../servicios/query/buscar-usuarios.service';
import {QueryRef} from 'apollo-angular';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from 'apollo-client';
import {NUEVA_SALA} from '../../constantes/subscriptor-sala';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ModalCrearSalaComponent} from '../../modales/modal-crear-sala/modal-crear-sala/modal-crear-sala.component';

@Component({
  selector: 'app-ruta-listar-salas',
  templateUrl: './ruta-listar-salas.component.html',
  styleUrls: ['./ruta-listar-salas.component.css']
})
export class RutaListarSalasComponent implements OnInit {

  estaCargando: boolean = true;

  esAdmin: boolean;

  salasQuery: QueryRef<{ salas: SalaInterface[] }>;

  salasObservable: Observable<ApolloQueryResult<{ salas: SalaInterface[] }>>;

  salas: SalaInterface[];

  existenSalas: boolean;

  constructor(
    private readonly _buscarSalasService: BuscarSalasService,
    private readonly _router: Router,
    private readonly _buscarUsuarioService: BuscarUsuariosService,
    public matDialog: MatDialog,
  ) {
    this.salasQuery = this._buscarSalasService.watch();
    this.salasObservable = this.salasQuery.valueChanges;
  }

  ngOnInit(): void {
    this.salasObservable
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
    this.verificarRolUsuario();
    this.subscribeAMasSalas();
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

  subscribeAMasSalas() {
    this.salasQuery.subscribeToMore({
      document: NUEVA_SALA,
      updateQuery: (salas, {subscriptionData}) => {
        console.log('salas', salas);
        console.log('valores subs', {subscriptionData})
        return null;
      }
    })
  }

  abrirModalCrearSala() {
    const dialogRef: MatDialogRef<ModalCrearSalaComponent> = this.matDialog.open(
      ModalCrearSalaComponent
    );
    dialogRef
      .afterClosed()
      .subscribe(
        (salaCreada: SalaInterface) => {
          this.salas.unshift(salaCreada);
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
