import {Component, Input, OnInit} from '@angular/core';
import {UsuarioSalaInterface} from '../../../../../interfaces/usuario-sala.interface';
import {NuevoUsuarioSalaService} from '../../../../../servicios/subscription/nuevo-usuario-sala.service';
import {EscucharAccionesUsuarioService} from '../../../../../servicios/subscription/escuchar-acciones-usuario.service';
import {ToasterService} from 'angular2-toaster';
import {diagramaGlobal} from '../../../../../componentes/diagrama-global/diagrama-global/diagrama-global.component';
import * as go from 'gojs';
import {diagramaEditable} from '../../../../../componentes/diagrama-editable/diagrama-editable/diagrama-editable.component';
import {UsuarioSalaService} from '../../../../../servicios/usuario-sala.service';
import {DiagramaUsuarioService} from '../../../../../servicios/diagrama-usuario.service';
import {DiagramaUsuarioInterface} from '../../../../../interfaces/diagrama-usuario.interface';
import {CargandoService} from '../../../../../servicios/cargando.service';
import {DatosDiagramaNodoInterface} from '../../../../../interfaces/datos-diagrama-nodo.interface';
import {DatosDiagramaLinkInterface} from '../../../../../interfaces/datos-diagrama-link.interface';
import {TemaSalaInterface} from '../../../../../interfaces/tema-sala.interface';
import {TemasSalaService} from '../../../../../servicios/temas-sala.service';

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

  datosDeTemas: DatosDiagramaNodoInterface[];

  datosDeConexiones: DatosDiagramaLinkInterface[];

  archivoASubir;

  datosActoresTemas: TemaSalaInterface[] = [];

  constructor(
    private readonly _nuevoUsuarioEnSalaService: NuevoUsuarioSalaService,
    private readonly _escucharAccionesUsuario: EscucharAccionesUsuarioService,
    private readonly _toasterService: ToasterService,
    private readonly _usuarioEnSalaService: UsuarioSalaService,
    private readonly _diagramaUsuarioService: DiagramaUsuarioService,
    private readonly _cargandoService: CargandoService,
    private readonly _temasSalasService: TemasSalaService,
    private readonly _temasSalaService: TemasSalaService,
  ) {
  }

  ngOnInit(): void {
    this.setearUsuariosEnSala();
    this.escucharNuevoUsuarioEnSala();
    this.escucharAccionesUsuario();
    this.verificarDiagramaGlobal();
    this.verificarTemasDeSala();
  }

  setearUsuariosEnSala(): void {
    this._usuarioEnSalaService
      .buscarUsuarioEnSala(
        this.idSala,
      )
      .subscribe(
        (usuariosEnSala: { usuarioSalas: UsuarioSalaInterface[] }) => {
          this.usuariosEnSala = usuariosEnSala.usuarioSalas;
          this.existenUsuariosEnSala = this.usuariosEnSala.length > 0;
        },
        error => {
          console.error({
            error,
            mensaje: 'Error consultado usuarios en sala'
          });
        }
      );
  }

  escucharNuevoUsuarioEnSala(): void {
    this._nuevoUsuarioEnSalaService
      .subscribe()
      .subscribe(
        ({data}) => {
          const nuevoUsuarioEnSala: UsuarioSalaInterface = data.usuarioSala.node;
          const esNuevoUsuarioEnSala: boolean = nuevoUsuarioEnSala.sala.id === this.idSala;
          if (esNuevoUsuarioEnSala) {
            this.usuariosEnSala.unshift(nuevoUsuarioEnSala);
            this.existenUsuariosEnSala = true;
          }
        },
        error => {
          console.error({
            error,
            mensaje: 'Error con el subscriptor de usuario sala'
          });
        }
      );
  }

  escucharAccionesUsuario(): void {
    this._escucharAccionesUsuario
      .subscribe()
      .subscribe(
        ({data}) => {
          this.setearUsuariosEnSala();
          const accionesUsuarioSala: UsuarioSalaInterface = data.usuarioSala.node;
          const pidePalabraOCompartePantalla: boolean = accionesUsuarioSala.levantarMano || accionesUsuarioSala.compartirPantalla;
          let tituloToaster: string;
          let mensajeToaster: string;
          if (accionesUsuarioSala.levantarMano) {
            tituloToaster = 'PIDIENDO LA PALABRA';
            mensajeToaster = `El usuario ${accionesUsuarioSala.usuario.nombre} está solicitando la palabra`;
          }
          if (accionesUsuarioSala.compartirPantalla) {
            tituloToaster = 'COMPARTIENDO PANTALLA';
            mensajeToaster = `El usuario ${accionesUsuarioSala.usuario.nombre} está compartiendo pantalla`;
          }
          if (pidePalabraOCompartePantalla) {
            return this._toasterService.pop(
              'info',
              `${tituloToaster}`,
              `${mensajeToaster}`
            );
          }
        },
        error => {
          console.error({
            error,
            mensaje: 'Error con el subscriptor de acciones usuario'
          });
        }
      );
  }

  verificarDiagramaGlobal(): void {
    this._cargandoService.habilitarCargando();
    this._diagramaUsuarioService
      .buscarDiagramaGlobal(
        this.idSala
      )
      .subscribe(
        (datosDiagramaGlobal: { diagramaUsuarios: DiagramaUsuarioInterface[] }) => {
          this._cargandoService.deshabilitarCargando();
          const tieneDiagramaGuardado: boolean = datosDiagramaGlobal.diagramaUsuarios.length > 0;
          if (tieneDiagramaGuardado) {
            const datosGuardados = JSON.parse(JSON.parse(datosDiagramaGlobal.diagramaUsuarios[0].diagrama.datos));
            this.datosDeTemas = datosGuardados.nodeDataArray;
            this.datosDeConexiones = datosGuardados.linkDataArray;
            diagramaGlobal.model = go.Model.fromJson(JSON.parse(datosDiagramaGlobal.diagramaUsuarios[0].diagrama.datos));
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

  guardarDiagramaGlobal(): void {
    this._diagramaUsuarioService
      .guardarDiagramaGlobal(
        JSON.stringify(diagramaEditable.model.toJson()),
        this.idSala,
        localStorage.getItem('usuario')
      );
  }

  cargarDatosCompartidos(idUsuario: string): void {
    this._diagramaUsuarioService
      .buscarDiagramaUsuario(
        this.idSala,
        idUsuario
      )
      .subscribe(
        (datosCompartidos: { diagramaUsuarios: DiagramaUsuarioInterface[] }) => {
          const diagramaCompartido: string = datosCompartidos.diagramaUsuarios[0].diagrama.datos;
          diagramaGlobal.model = go.Model.fromJson(JSON.parse(diagramaCompartido));
        },
        error => {
          console.error({
            error,
            mensaje: 'Error cargando datos compartidos'
          });
        }
      );
  }

  seleccionarArchivo(evento): void {
    this.archivoASubir = evento.target.files[0];
    const reader: FileReader = new FileReader();
    reader.addEventListener('load', (eventoArchivo) => {
      const contenidoArchivo = eventoArchivo.target.result as string;
      for (const linea of contenidoArchivo.split(/[\r\n]/)) {
        const contenidoASetear = linea.split(';');
        const tieneContenidoCompleto = contenidoASetear.length === 5;
        if (tieneContenidoCompleto) {
          const objetoSeteado: TemaSalaInterface = {
            titulo: contenidoASetear[0],
            fuente: contenidoASetear[1],
            resumen: contenidoASetear[2],
            tema: contenidoASetear[3],
            actor: contenidoASetear[4],
          };
          this.datosActoresTemas.push(objetoSeteado);
        }
      }
    });
    reader.readAsText(evento.target.files[0]);
  }

  guardarArchivo(): void {
    this._cargandoService.habilitarCargando();
    this._temasSalasService
      .guardarTemasDeSala(
        this.idSala,
        this.datosActoresTemas
      )
      .subscribe(
        () => {
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error,
            mensaje: 'Error guardando datos de temas'
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

  escucharCambiosTabView(evento): void {
    const seleccionaIndiceDiagramasCompartidos: boolean = evento.index === 1;
    if (seleccionaIndiceDiagramasCompartidos) {
      this.setearUsuariosEnSala();
      this.verificarDiagramaGlobal();
    }
  }
}
