import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SalaService} from '../../../../servicios/sala.service';
import {CargandoService} from '../../../../servicios/cargando.service';
import {SalaInterface} from '../../../../interfaces/sala.interface';
import {UsuarioService} from '../../../../servicios/usuario.service';
import {UsuarioSalaService} from '../../../../servicios/usuario-sala.service';
import {UsuarioSalaInterface} from '../../../../interfaces/usuario-sala.interface';

@Component({
  selector: 'app-ruta-sala-reunion',
  templateUrl: './ruta-sala-reunion.component.html',
  styleUrls: ['./ruta-sala-reunion.component.css']
})
export class RutaSalaReunionComponent implements OnInit {

  idSala: string;

  esAdmin: boolean;

  existeUsuarioEnSala: boolean;

  nombreSala: string;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _usuarioService: UsuarioService,
    private readonly _salaService: SalaService,
    private readonly _usuarioSalaService: UsuarioSalaService,
    private readonly _cargandoService: CargandoService
  ) {
  }

  ngOnInit(): void {
    this._cargandoService.habilitarCargando();
    this._activatedRoute
      .params
      .subscribe(
        parametrosRuta => {
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
          })
        }
      );
  }

  verificarRolUsuario() {
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

  verificarUsuarioEnSala() {
    return this._usuarioSalaService.buscarUsuarioEnSala(
      this.idSala,
      localStorage.getItem('usuario')
    )
      .subscribe(
        (usuario: { usuarioSalas: UsuarioSalaInterface[] }) => {
          this.existeUsuarioEnSala = usuario.usuarioSalas.length > 0;

          if (!this.esAdmin) {
            if (!this.existeUsuarioEnSala) {
              this._usuarioSalaService.unirseASala(
                this.idSala,
                localStorage.getItem('usuario')
              );
            } else {
              const idUsuarioEnSala: string = usuario.usuarioSalas[0].id;
              this._usuarioSalaService.accionesUsuarioEnSala(
                idUsuarioEnSala,
                false,
                false
              )
            }
          }
        },
        error => {
          console.error({
            error,
            mensaje: 'Error consultado usuarios en sala'
          })
        }
      )
  }

  setearNombreSala() {
    return this._salaService
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
          })
        }
      );
  }
}
