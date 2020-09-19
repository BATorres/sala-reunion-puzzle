import {Component, Input, OnInit} from '@angular/core';
import {UsuarioSalaInterface} from '../../../../../interfaces/usuario-sala.interface';
import {NuevoUsuarioSalaService} from '../../../../../servicios/subscription/nuevo-usuario-sala.service';
import {EscucharAccionesUsuarioService} from '../../../../../servicios/subscription/escuchar-acciones-usuario.service';
import {ToasterService} from 'angular2-toaster';
import {diagramaGlobal} from '../../../../../componentes/diagrama-global/diagrama-global/diagrama-global.component';
import * as go from 'gojs';
import {diagramaEditable} from '../../../../../componentes/diagrama-editable/diagrama-editable/diagrama-editable.component';
import {UsuarioSalaService} from '../../../../../servicios/usuario-sala.service';
import {BuscarUsuariosEnSalaService} from '../../../../../servicios/query/buscar-usuarios-en-sala.service';
import {DiagramaUsuarioService} from '../../../../../servicios/diagrama-usuario.service';
import {DiagramaUsuarioInterface} from '../../../../../interfaces/diagrama-usuario.interface';
import {CargandoService} from '../../../../../servicios/cargando.service';
import {DatosDiagramaNodoInterface} from '../../../../../interfaces/datos-diagrama-nodo.interface';
import {DatosDiagramaLinkInterface} from '../../../../../interfaces/datos-diagrama-link.interface';

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

  constructor(
    private readonly _nuevoUsuarioEnSalaService: NuevoUsuarioSalaService,
    private readonly _escucharAccionesUsuario: EscucharAccionesUsuarioService,
    private readonly _toasterService: ToasterService,
    private readonly _usuarioEnSalaService: UsuarioSalaService,
    private readonly _buscarUsuariosEnSalaService: BuscarUsuariosEnSalaService,
    private readonly _diagramaUsuarioService: DiagramaUsuarioService,
    private readonly _cargandoService: CargandoService
  ) {
  }

  ngOnInit(): void {
    this.setearUsuariosEnSala();
    this.escucharNuevoUsuarioEnSala();
    this.escucharAccionesUsuario();
    this.verificarDiagramaGlobal();
  }

  setearUsuariosEnSala(): void {
    this._buscarUsuariosEnSalaService
      .watch({
        sala: this.idSala,
        usuario: localStorage.getItem('usuario')
      })
      .valueChanges
      .subscribe(
        (usuariosEnSala) => {
          this.usuariosEnSala = usuariosEnSala.data.usuarioSalas;
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
          this.usuariosEnSala.unshift(nuevoUsuarioEnSala);
          this.existenUsuariosEnSala = true;
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
          } else {
            this.datosDeTemas = [
              {key: 'Nodo', loc: '-57.899993896484375 -164', text: 'Tema 1', autor: 'Sin autor'},
              {key: 'Nodo2', loc: '39.100006103515625 -25', text: 'Tema 2', autor: 'Sin autor'}
            ];
            this.datosDeConexiones = [
              {category: 'Casualidad', from: 'Nodo2', to: 'Nodo'}
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
        const tieneContenidoCompleto = contenidoASetear.length === 3;
        if (tieneContenidoCompleto) {
          console.log('lo que voa setear', tieneContenidoCompleto);
        }
      }
    });
    reader.readAsText(evento.target.files[0]);
  }
}
