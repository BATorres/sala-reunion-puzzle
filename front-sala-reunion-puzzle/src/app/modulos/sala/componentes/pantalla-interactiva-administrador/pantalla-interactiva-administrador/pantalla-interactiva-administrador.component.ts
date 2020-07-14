import {Component, Input, OnInit} from '@angular/core';
import {BuscarUsuariosEnSalaService} from '../../../../../servicios/query/buscar-usuarios-en-sala.service';
import {UsuarioSalaInterface} from '../../../../../interfaces/usuario-sala.interface';
import {NuevoUsuarioSalaService} from '../../../../../servicios/subscription/nuevo-usuario-sala.service';
import {EscucharAccionesUsuarioService} from '../../../../../servicios/subscription/escuchar-acciones-usuario.service';
import {ToasterService} from 'angular2-toaster';
import {BuscarDiagramaUsuarioService} from '../../../../../servicios/query/buscar-diagrama-usuario.service';
import {diagramaGlobal} from '../../../../../componentes/diagrama-global/diagrama-global/diagrama-global.component';
import * as go from 'gojs';

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
    private readonly _toasterService: ToasterService,
    private readonly _buscarDiagramaUsuarioService: BuscarDiagramaUsuarioService
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
          const accionesUsuarioSala: UsuarioSalaInterface = data.usuarioSala.node;
          const pidePalabraOCompartePantalla: boolean = accionesUsuarioSala.levantarMano || accionesUsuarioSala.compartirPantalla;
          let tituloToaster: string;
          let mensajeToaster: string;
          if (accionesUsuarioSala.levantarMano) {
            tituloToaster = 'PIDIENDO LA PALABRA';
            mensajeToaster = `El usuario ${accionesUsuarioSala.usuario.nombre} está solicitando la palabra`
          }
          if (accionesUsuarioSala.compartirPantalla) {
            tituloToaster = 'COMPARTIENDO PANTALLA';
            mensajeToaster = `El usuario ${accionesUsuarioSala.usuario.nombre} está compartiendo pantalla`
          }
          if (pidePalabraOCompartePantalla) {
            this._toasterService.pop(
              'info',
              `${tituloToaster}`,
              `${mensajeToaster}`
            )
          }
        },
        error => {
          console.error({
            error,
            mensaje: 'Error con el subscriptor de acciones usuario'
          })
        }
      )
  }
  cargarDatosCompartidos(idUsuario: string) {
    this._buscarDiagramaUsuarioService
      .watch({
        idSala: this.idSala,
        idUsuario: idUsuario
      })
      .valueChanges
      .subscribe(
        ({data}) => {
          const datosCompartidos: string = data.diagramaUsuarios[0].diagrama.datos;
          diagramaGlobal.model = go.Model.fromJson(JSON.parse(datosCompartidos));
        },
        error => {
          console.error({
            error,
            mensaje: 'Error cargando datos compartidos'
          });
        }
      )
  }
}
