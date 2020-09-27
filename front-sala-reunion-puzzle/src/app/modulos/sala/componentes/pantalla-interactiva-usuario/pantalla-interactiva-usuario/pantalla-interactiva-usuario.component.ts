import {Component, Input, OnInit} from '@angular/core';
import {diagramaEditable} from '../../../../../componentes/diagrama-editable/diagrama-editable/diagrama-editable.component';
import {UsuarioSalaService} from '../../../../../servicios/usuario-sala.service';
import {CargandoService} from '../../../../../servicios/cargando.service';
import {DiagramaUsuarioService} from '../../../../../servicios/diagrama-usuario.service';
import {DiagramaUsuarioInterface} from '../../../../../interfaces/diagrama-usuario.interface';
import {UsuarioSalaInterface} from '../../../../../interfaces/usuario-sala.interface';
import {DatosDiagramaNodoInterface} from '../../../../../interfaces/datos-diagrama-nodo.interface';
import {DatosDiagramaLinkInterface} from '../../../../../interfaces/datos-diagrama-link.interface';

@Component({
  selector: 'app-pantalla-interactiva-usuario',
  templateUrl: './pantalla-interactiva-usuario.component.html',
  styleUrls: ['./pantalla-interactiva-usuario.component.css']
})
export class PantallaInteractivaUsuarioComponent implements OnInit {

  @Input()
  idSala: string;

  idUsuarioSala: string;

  datosDeTemas: DatosDiagramaNodoInterface[];

  datosDeConexiones: DatosDiagramaLinkInterface[];

  constructor(
    private readonly _usuarioEnSalaService: UsuarioSalaService,
    private readonly _diagramaUsuarioService: DiagramaUsuarioService,
    private readonly _cargandoService: CargandoService
  ) {
  }

  ngOnInit(): void {
    this.verificarUsuarioEnSala();
    this.verificarDiagramaUsuario();
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
            this._cargandoService.deshabilitarCargando();
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

  pedirLaPalabra(): void {
    this._usuarioEnSalaService
      .accionesUsuarioEnSala(
        this.idUsuarioSala,
        true,
        false
      );
  }

  compartirPantalla(): void {
    this.guardarDiagramaUsuario();
    this._usuarioEnSalaService
      .accionesUsuarioEnSala(
        this.idUsuarioSala,
        false,
        true
      );
  }

  cancelar(): void {
    this._usuarioEnSalaService
      .accionesUsuarioEnSala(
        this.idUsuarioSala,
        false,
        false
      );
  }

  guardarDiagramaUsuario(): void {
    this._diagramaUsuarioService
      .guardarDiagrama(
        JSON.stringify(diagramaEditable.model.toJson()),
        this.idSala,
        localStorage.getItem('usuario'),
      );
  }
}
