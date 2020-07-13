import {Component, Input, OnInit} from '@angular/core';
import {BuscarUsuariosEnSalaService} from '../../../../../servicios/query/buscar-usuarios-en-sala.service';
import {UsuarioSalaInterface} from '../../../../../interfaces/usuario-sala.interface';
import {NuevoUsuarioSalaService} from '../../../../../servicios/subscription/nuevo-usuario-sala.service';
import {EscucharAccionesUsuarioService} from '../../../../../servicios/subscription/escuchar-acciones-usuario.service';

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
    private readonly _buscarUsuariosEnSalaService: BuscarUsuariosEnSalaService,
    private readonly _nuevoUsuarioEnSalaService: NuevoUsuarioSalaService,
    private readonly _escucharAccionesUsuario: EscucharAccionesUsuarioService,
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
        },
        error => {
          console.error({
            error,
            mensaje: 'Error consultado usuarios en sala'
          })
        }
      );
    this._nuevoUsuarioEnSalaService
      .subscribe()
      .subscribe(
        ({data}) => {
          const nuevoUsuarioEnSala: UsuarioSalaInterface = data.usuarioSala.node;
          this.usuariosEnSala.unshift(nuevoUsuarioEnSala);
          this.existenUsuariosEnSala = true;
        },
        error => {
          console.error({
            error,
            mensaje: 'Error con el subscriptor de usuario sala'
          })
        }
      );
    this._escucharAccionesUsuario
      .subscribe()
      .subscribe(
        ({data}) => {
          const cambiosUsuario: UsuarioSalaInterface = data.usuarioSala.node;
        },
        error => {
          console.error({
            error,
            mensaje: 'Error con el subscriptor de acciones usuario'
          })
        }
      )
  }
}
