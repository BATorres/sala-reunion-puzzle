import {Component, Input, OnInit} from '@angular/core';
import {AccionesUsuarioSalaService} from '../../../../../servicios/mutation/acciones-usuario-sala.service';
import {BuscarUsuariosEnSalaService} from '../../../../../servicios/query/buscar-usuarios-en-sala.service';
import {UsuarioSalaInterface} from '../../../../../interfaces/usuario-sala.interface';
import {BuscarDiagramaUsuarioService} from '../../../../../servicios/query/buscar-diagrama-usuario.service';
import {CrearDiagramaService} from '../../../../../servicios/mutation/crear-diagrama.service';
import {ActualizarDiagramaService} from '../../../../../servicios/mutation/actualizar-diagrama.service';
import {diagramaEditable} from '../../../../../componentes/diagrama-editable/diagrama-editable/diagrama-editable.component';
import * as go from 'gojs';

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
    private readonly _accionesUsuarioEnSalaService: AccionesUsuarioSalaService,
    private readonly _buscarDiagramaUsuarioService: BuscarDiagramaUsuarioService,
    private readonly _crearDiagramaService: CrearDiagramaService,
    private readonly _actualizarDiagramaService: ActualizarDiagramaService
  ) {
  }

  ngOnInit(): void {
    this.verificarUsuarioEnSala();
    this.verificarDiagramaUsuario();
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
          const usuarioFiltrado = data.usuarioSalas.filter(
            (usuario: UsuarioSalaInterface) =>
            {
              return usuario.usuario.id === localStorage.getItem('usuario')
            }
          )[0];
          if (usuarioFiltrado) {
            this.idUsuarioSala = usuarioFiltrado.id;
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

  verificarDiagramaUsuario() {
    this._buscarDiagramaUsuarioService
      .watch({
        idSala: this.idSala,
        idUsuario: localStorage.getItem('usuario')
      })
      .valueChanges
      .subscribe(
        respuestaBuscarDiagramaUsuario => {
          const tieneDiagramaGuardado: boolean = respuestaBuscarDiagramaUsuario.data.diagramaUsuarios.length > 0;
          if (tieneDiagramaGuardado) {
            const datosACargar = respuestaBuscarDiagramaUsuario.data.diagramaUsuarios[0].diagrama.datos;
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
          this.guardarDiagramaUsuario();
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

  guardarDiagramaUsuario() {
    return this._buscarDiagramaUsuarioService
      .watch({
        idSala: this.idSala,
        idUsuario: localStorage.getItem('usuario')
      })
      .valueChanges
      .subscribe(
        respuestaQueryGuardarDiagrama => {
          const datos: string = JSON.stringify(diagramaEditable.model.toJson());
          const tieneDiagramaUsuario: boolean = respuestaQueryGuardarDiagrama.data.diagramaUsuarios.length > 0;
          if (tieneDiagramaUsuario) {
            const idDiagramaUsuario: string = respuestaQueryGuardarDiagrama.data.diagramaUsuarios[0].id;
            return this._actualizarDiagramaService
              .mutate({
                idDiagramaSala: idDiagramaUsuario,
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
              );

          } else {
            return this._crearDiagramaService
              .mutate({
                datos: datos,
                idSala: this.idSala,
                idUsuario: localStorage.getItem('usuario')
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
        }
      )
  }
}
