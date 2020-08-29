import {Component, Input, OnInit} from '@angular/core';
import {UsuarioSalaInterface} from '../../../../../interfaces/usuario-sala.interface';
import {NuevoUsuarioSalaService} from '../../../../../servicios/subscription/nuevo-usuario-sala.service';
import {EscucharAccionesUsuarioService} from '../../../../../servicios/subscription/escuchar-acciones-usuario.service';
import {ToasterService} from 'angular2-toaster';
import {BuscarDiagramaUsuarioService} from '../../../../../servicios/query/buscar-diagrama-usuario.service';
import {diagramaGlobal} from '../../../../../componentes/diagrama-global/diagrama-global/diagrama-global.component';
import * as go from 'gojs';
import {diagramaEditable} from '../../../../../componentes/diagrama-editable/diagrama-editable/diagrama-editable.component';
import {CrearDiagramaService} from '../../../../../servicios/mutation/crear-diagrama.service';
import {ActualizarDiagramaService} from '../../../../../servicios/mutation/actualizar-diagrama.service';
import {UsuarioSalaService} from '../../../../../servicios/usuario-sala.service';

@Component({
  selector: 'app-pantalla-interactiva-administrador',
  templateUrl: './pantalla-interactiva-administrador.component.html',
  styleUrls: ['./pantalla-interactiva-administrador.component.css']
})
export class PantallaInteractivaAdministradorComponent implements OnInit {

  @Input()
  idSala: string;

  existenUsuariosEnSala: boolean;

  usuariosEnSala: UsuarioSalaInterface[];

  constructor(
    private readonly _nuevoUsuarioEnSalaService: NuevoUsuarioSalaService,
    private readonly _escucharAccionesUsuario: EscucharAccionesUsuarioService,
    private readonly _toasterService: ToasterService,
    private readonly _buscarDiagramaUsuarioService: BuscarDiagramaUsuarioService,
    private readonly _crearDiagramaService: CrearDiagramaService,
    private readonly _actualizarDiagramaService: ActualizarDiagramaService,
    private readonly _usuarioEnSalaService: UsuarioSalaService
  ) {
  }

  ngOnInit(): void {
    this._usuarioEnSalaService
      .buscarUsuarioEnSala(
        this.idSala
      )
      .subscribe(
        (usuariosEnSala: {usuarioSalas: UsuarioSalaInterface[]}) => {
          this.usuariosEnSala = usuariosEnSala.usuarioSalas;
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
      );
    this.verificarDiagramaGlobal();
  }

  verificarDiagramaGlobal() {
    this._buscarDiagramaUsuarioService
      .watch({
        idSala: this.idSala,
        esDiagramaGlobal: true
      })
      .valueChanges
      .subscribe(
        ({data}) => {
          const tieneDiagramaGuardado: boolean = data.diagramaUsuarios.length > 0;
          if (tieneDiagramaGuardado) {
            const datosACargar = data.diagramaUsuarios[0].diagrama.datos;
            diagramaEditable.model = go.Model.fromJson(JSON.parse(datosACargar));
          }
        },
        error => {
          console.error({
            error,
            mensaje: 'Error verificando diagrama de usuario'
          });
        }
      );
  }

  guardarDiagramaGlobal() {
    this._buscarDiagramaUsuarioService
      .watch({
        idSala: this.idSala,
        esDiagramaGlobal: true
      })
      .valueChanges
      .subscribe(
        ({data}) => {
          const datos: string = JSON.stringify(diagramaEditable.model.toJson());
          const existeDiagramaGlobal: boolean = data.diagramaUsuarios.length > 0;
          if (existeDiagramaGlobal) {
            const idDiagramaGlobal: string = data.diagramaUsuarios[0].id;
            return this._actualizarDiagramaService
              .mutate({
                idDiagramaSala: idDiagramaGlobal,
                datos: datos
              })
              .subscribe(
                () => {},
                error => {
                  console.error({
                    error,
                    mensaje: 'Error actualizando los datos del diagrama'
                  })
                }
              )
          } else {
            return this._crearDiagramaService
              .mutate({
                datos: datos,
                idSala: this.idSala,
                idUsuario: localStorage.getItem('usuario'),
                esDiagramaGlobal: true
              })
              .subscribe(
                () => {},
                error => {
                  console.error({
                    error,
                    mensaje: 'Error creando diagrama usuario'
                  })
                }
              );
          }
        },
        error => {
          console.error({
            error,
            mensaje: 'Error buscando el diagrama global'
          })
        }
      );
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
