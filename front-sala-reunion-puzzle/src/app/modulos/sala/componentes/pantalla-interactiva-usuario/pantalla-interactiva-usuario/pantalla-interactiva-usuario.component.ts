import {Component, Input, OnInit} from '@angular/core';
import {diagramaEditable} from '../../../../../componentes/diagrama-editable/diagrama-editable/diagrama-editable.component';
import * as go from 'gojs';
import {UsuarioSalaService} from '../../../../../servicios/usuario-sala.service';
import {CargandoService} from '../../../../../servicios/cargando.service';
import {DiagramaUsuarioService} from '../../../../../servicios/diagrama-usuario.service';
import {DiagramaUsuarioInterface} from '../../../../../interfaces/diagrama-usuario.interface';
import {UsuarioSalaInterface} from '../../../../../interfaces/usuario-sala.interface';

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
    private readonly _usuarioEnSalaService: UsuarioSalaService,
    private readonly _diagramaUsuarioService: DiagramaUsuarioService,
    private readonly _cargandoService: CargandoService
  ) {
  }

  ngOnInit(): void {
    this.verificarUsuarioEnSala();
    this.verificarDiagramaUsuario();
  }

  verificarUsuarioEnSala() {
    this._cargandoService.habilitarCargando();
    this._usuarioEnSalaService
      .buscarUsuarioEnSala(
        this.idSala,
        localStorage.getItem('usuario')
      )
      .subscribe(
        (usuariosEnSala: {usuarioSalas: UsuarioSalaInterface[]}) => {
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
          })
        }
      );
  }

  verificarDiagramaUsuario() {
    return this._diagramaUsuarioService
      .buscarDiagramaUsuario(
        this.idSala,
        localStorage.getItem('usuario')
      )
      .subscribe(
        (diagramaUsuario: { diagramaUsuarios: DiagramaUsuarioInterface[]}) => {
          const tieneDiagramaGuardado: boolean = diagramaUsuario.diagramaUsuarios.length > 0;
          if (tieneDiagramaGuardado) {
            const datosACargar = diagramaUsuario.diagramaUsuarios[0].diagrama.datos;
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
    return this._usuarioEnSalaService
      .accionesUsuarioEnSala(
        this.idUsuarioSala,
        true,
        false
      );
  }

  compartirPantalla() {
    this.guardarDiagramaUsuario();
    return this._usuarioEnSalaService
      .accionesUsuarioEnSala(
        this.idUsuarioSala,
        false,
        true
      );
  }

  cancelar() {
    return this._usuarioEnSalaService
      .accionesUsuarioEnSala(
        this.idUsuarioSala,
        false,
        false
      );
  }

  guardarDiagramaUsuario() {
    this._diagramaUsuarioService
      .guardarDiagrama(
        JSON.stringify(diagramaEditable.model.toJson()),
        this.idSala,
        localStorage.getItem('usuario'),
      );
  }
}
