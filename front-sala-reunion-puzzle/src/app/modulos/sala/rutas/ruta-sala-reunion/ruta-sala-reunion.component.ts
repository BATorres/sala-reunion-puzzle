import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SalaService} from '../../../../servicios/sala.service';
import {CargandoService} from '../../../../servicios/cargando.service';
import {SalaInterface} from '../../../../interfaces/sala.interface';
import {UsuarioService} from '../../../../servicios/usuario.service';
import {UsuarioSalaService} from '../../../../servicios/usuario-sala.service';
import {BuscarUsuariosEnSalaService} from '../../../../servicios/query/buscar-usuarios-en-sala.service';

@Component({
  selector: 'app-ruta-sala-reunion',
  templateUrl: './ruta-sala-reunion.component.html',
  styleUrls: ['./ruta-sala-reunion.component.css']
})
export class RutaSalaReunionComponent implements OnInit {

  idSala: string;

  idUsuarioEnSala: string;

  esAdmin: boolean;

  nombreSala: string;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _usuarioService: UsuarioService,
    private readonly _salaService: SalaService,
    private readonly _usuarioSalaService: UsuarioSalaService,
    private readonly _buscarUsuariosEnSalaService: BuscarUsuariosEnSalaService,
    private readonly _cargandoService: CargandoService
  ) {
  }

  ngOnInit(): void {
    this._cargandoService.habilitarCargando();
    this._activatedRoute
      .params
      .subscribe(
        parametrosRuta => {
          this.esAdmin = history.state.esAdmin;
          this.idSala = parametrosRuta.idSala;
          this.verificarRolUsuario();
          this.setearNombreSala();
          this.verificarUsuarioEnSala();
          this._cargandoService.deshabilitarCargando();
        },
        error => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error,
            mensaje: 'Error cargando los parámetros de ruta'
          });
        }
      );
  }

  verificarRolUsuario(): void {
    this._usuarioService
      .verificarEsAdmin(
        localStorage.getItem('usuario')
      )
      .subscribe(
        (esUsuarioAdmin: boolean) => {
          this.esAdmin = esUsuarioAdmin;
        },
        error => {
          console.error({
            error,
            mensaje: 'Error verificando rol de usuario'
          });
        }
      );
  }

  verificarUsuarioEnSala(): void {
    this._buscarUsuariosEnSalaService
      .watch({
        sala: this.idSala,
        usuario: localStorage.getItem('usuario')
      })
      .valueChanges
      .subscribe(
        (usuario) => {
          const existeUsuarioEnSala: boolean = usuario.data.usuarioSalas.length > 0;
          const existeIdUsuarioEnSala = this.idUsuarioEnSala !== undefined;

          if (!this.esAdmin) {
            if (!existeUsuarioEnSala && !existeIdUsuarioEnSala) {
              this._usuarioSalaService
                .unirseASala(
                  this.idSala,
                  localStorage.getItem('usuario')
                )
                .subscribe(
                  ({data}) => {
                    this.idUsuarioEnSala = data.createUsuarioSala.id;
                  },
                  error => {
                    console.error({
                      error,
                      mensaje: 'Error con las acciones de usuario en sala'
                    });
                  }
                );
            } else {
              this.idUsuarioEnSala = usuario.data.usuarioSalas[0].id;
              this._usuarioSalaService.accionesUsuarioEnSala(
                this.idUsuarioEnSala,
                false,
                false
              );
            }
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

  setearNombreSala(): void {
    this._salaService
      .findOne(
        this.idSala
      )
      .subscribe(
        (salaEncontrada: { sala: SalaInterface }) => {
          this.nombreSala = salaEncontrada.sala.nombre;
        },
        error => {
          console.error({
            error,
            mensaje: 'Error buscando sala'
          });
        }
      );
  }
}
