import {Component, Input, OnInit} from '@angular/core';
import {diagramaEditable} from '../../../../../componentes/diagrama-editable/diagrama-editable/diagrama-editable.component';
import {UsuarioSalaService} from '../../../../../servicios/usuario-sala.service';
import {CargandoService} from '../../../../../servicios/cargando.service';
import {DiagramaUsuarioService} from '../../../../../servicios/diagrama-usuario.service';
import {DiagramaUsuarioInterface} from '../../../../../interfaces/diagrama-usuario.interface';
import {UsuarioSalaInterface} from '../../../../../interfaces/usuario-sala.interface';
import {DatosDiagramaNodoInterface} from '../../../../../interfaces/datos-diagrama-nodo.interface';
import {DatosDiagramaLinkInterface} from '../../../../../interfaces/datos-diagrama-link.interface';
import {TemasSalaService} from '../../../../../servicios/temas-sala.service';
import {EscucharTemasSalaService} from '../../../../../servicios/subscription/escuchar-temas-sala.service';
import {TemaSalaInterface} from '../../../../../interfaces/tema-sala.interface';
import {SalaInterface} from '../../../../../interfaces/sala.interface';
import {diagramaGlobal} from '../../../../../componentes/diagrama-global/diagrama-global/diagrama-global.component';
import * as go from 'gojs';
import {Toast, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-pantalla-interactiva-usuario',
  templateUrl: './pantalla-interactiva-usuario.component.html',
  styleUrls: ['./pantalla-interactiva-usuario.component.css']
})
export class PantallaInteractivaUsuarioComponent implements OnInit {

  @Input()
  idSala: string;

  @Input()
  idUsuarioSala: string;

  datosDeTemas: DatosDiagramaNodoInterface[];

  datosDeConexiones: DatosDiagramaLinkInterface[];

  datosActoresTemas: TemaSalaInterface[];

  constructor(
    private readonly _usuarioEnSalaService: UsuarioSalaService,
    private readonly _diagramaUsuarioService: DiagramaUsuarioService,
    private readonly _cargandoService: CargandoService,
    private readonly _temasSalaService: TemasSalaService,
    private readonly _escucharTemasSalaService: EscucharTemasSalaService,
    private readonly _toasterService: ToasterService,
  ) {
  }

  ngOnInit(): void {
    this.verificarUsuarioEnSala();
    this.verificarDiagramaUsuario();
    this.verificarDiagramaGlobal();
    this.verificarTemasDeSala();
    this.escucharTemasEnSala();
  }

  verificarUsuarioEnSala(): void {
    this._cargandoService.habilitarCargando();
    this._usuarioEnSalaService
      .buscarUsuarioEnSala(
        this.idSala,
        localStorage.getItem('usuario')
      )
      .subscribe(
        (usuariosEnSala: { usuarioSalas: UsuarioSalaInterface[] }) => {
          const existeUsuarioSala: boolean = usuariosEnSala.usuarioSalas.length > 0;

          if (existeUsuarioSala) {
            this.idUsuarioSala = usuariosEnSala.usuarioSalas[0].id;
          }
        },
        error => {
          console.error({
            error,
            mensaje: 'Error consultado usuarios en sala'
          });
        }
      );
  }

  verificarDiagramaGlobal(): void {
    this._diagramaUsuarioService
      .buscarDiagramaGlobal(
        this.idSala
      )
      .subscribe(
        (datosDiagramaGlobal: { diagramaUsuarios: DiagramaUsuarioInterface[] }) => {
          this._cargandoService.deshabilitarCargando();
          const tieneDiagramaGuardado: boolean = datosDiagramaGlobal.diagramaUsuarios.length > 0;
          if (tieneDiagramaGuardado) {
            const datosGuardados = datosDiagramaGlobal.diagramaUsuarios[0].diagrama.datos;
            diagramaGlobal.model = go.Model.fromJson(JSON.parse(datosGuardados));
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

  verificarDiagramaUsuario(): void {
    this._diagramaUsuarioService
      .buscarDiagramaUsuario(
        this.idSala,
        localStorage.getItem('usuario')
      )
      .subscribe(
        (diagramaUsuario: { diagramaUsuarios: DiagramaUsuarioInterface[] }) => {
          const tieneDiagramaGuardado: boolean = diagramaUsuario.diagramaUsuarios.length > 0;
          if (tieneDiagramaGuardado) {
            const datosGuardados = JSON.parse(JSON.parse(diagramaUsuario.diagramaUsuarios[0].diagrama.datos));
            this.datosDeTemas = datosGuardados.nodeDataArray;
            this.datosDeConexiones = datosGuardados.linkDataArray;
          } else {
            this._diagramaUsuarioService
              .buscarDiagramaGlobal(this.idSala)
              .subscribe((datosDiagramaGlobal: { diagramaUsuarios: DiagramaUsuarioInterface[] }) => {
                  this._cargandoService.deshabilitarCargando();
                  const existeDiagramaGlobal: boolean = datosDiagramaGlobal.diagramaUsuarios.length > 0;
                  if (existeDiagramaGlobal) {
                    const datosGuardados = JSON.parse(JSON.parse(datosDiagramaGlobal.diagramaUsuarios[0].diagrama.datos));
                    this.datosDeTemas = datosGuardados.nodeDataArray;
                    this.datosDeConexiones = datosGuardados.linkDataArray;
                  } else {
                    this.datosDeTemas = [
                      {
                        key: 'Nodo',
                        loc: '-57.899993896484375 -164',
                        titulo: 'Título 1',
                        fuente: 'Fuente 1',
                        resumen: 'Resumen 1',
                        tema: 'Tema 1',
                        actor: 'Sin actor'
                      },
                      {
                        key: 'Nodo2',
                        loc: '39.100006103515625 -25',
                        titulo: 'Título 2',
                        fuente: 'Fuente 2',
                        resumen: 'Resumen 2',
                        tema: 'Tema 2',
                        actor: 'Sin actor'
                      }
                    ];
                    this.datosDeConexiones = [
                      {category: 'Causalidad', from: 'Nodo2', to: 'Nodo'}
                    ];
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
        },
        error => {
          console.error({
            error,
            mensaje: 'Error verificando diagrama de usuario'
          });
        }
      );
  }

  verificarTemasDeSala(): void {
    this._temasSalaService
      .buscarTemasPorSala(
        this.idSala
      )
      .subscribe((temaSalas: { temaSalas: TemaSalaInterface[] }) => {
          this.datosActoresTemas = temaSalas.temaSalas;
        },
        error => {
          console.error({
            error,
            mensaje: 'Error buscando los temas de sala'
          });
        }
      );
  }

  pedirLaPalabra(): void {
    this._usuarioEnSalaService
      .accionesUsuarioEnSala(
        this.idUsuarioSala,
        true,
        false
      )
      .subscribe(() => {
        const toastPedirPalabra: Toast = {
          type: 'info',
          title: 'PIDIENDO LA PALABRA',
          body: 'Acaba de pedir la palabra',
          showCloseButton: true,
        };
        this._toasterService.pop(toastPedirPalabra);
      }, error => {
        console.error({
          error,
          mensaje: 'Error pidiendo la palabra'
        });
      });
  }

  compartirPantalla(): void {
    this.guardarDiagramaUsuario();
    this._usuarioEnSalaService
      .accionesUsuarioEnSala(
        this.idUsuarioSala,
        false,
        true
      )
      .subscribe(() => {
        const toastCompartirPantalla: Toast = {
          type: 'success',
          title: 'COMPARTIR PANTALLA',
          body: 'Los datos del diagrama se han guardado correctamente y están siendo compartidos',
          showCloseButton: true,
        };
        this._toasterService.pop(toastCompartirPantalla);
      }, error => {
        console.error({
          error,
          mensaje: 'Error compartiendo pantalla'
        });
      });
  }

  cancelar(): void {
    this._usuarioEnSalaService
      .accionesUsuarioEnSala(
        this.idUsuarioSala,
        false,
        false
      )
      .subscribe(() => {
        const toastCancelar: Toast = {
          type: 'warning',
          title: 'CANCELAR',
          body: 'Acaba de cancelar las acciones de la sala',
          showCloseButton: true,
        };
        this._toasterService.pop(toastCancelar);
      }, error => {
        console.error({
          error,
          mensaje: 'Error cancelando acciones en sala'
        });
      });
  }

  guardarDiagramaUsuario(): void {
    this._diagramaUsuarioService
      .guardarDiagrama(
        JSON.stringify(diagramaEditable.model.toJson()),
        this.idSala,
        localStorage.getItem('usuario'),
      );
  }

  escucharTemasEnSala(): void {
    this._escucharTemasSalaService
      .subscribe()
      .subscribe(
        ({data}) => {
          const datosTemas: TemaSalaInterface = data.temaSala.node;
          const llegaTemaASala: boolean = (datosTemas.sala as SalaInterface).id === this.idSala;
          if (llegaTemaASala) {
            this.datosActoresTemas.unshift(datosTemas);
          }
        },
        error => {
          console.error({
            error,
            mensaje: 'Error con el subscriptor de temas sala'
          });
        }
      );
  }

  escucharCambiosTabView(evento): void {
    const seleccionaIndiceDiagramaGlobal: boolean = evento.index === 1;
    if (seleccionaIndiceDiagramaGlobal) {
      this.verificarDiagramaGlobal();
    }
  }
}
