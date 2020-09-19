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

  esAdmin: boolean;

  existeUsuarioEnSala: boolean;

  nombreSala: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly usuarioService: UsuarioService,
    private readonly salaService: SalaService,
    private readonly usuarioSalaService: UsuarioSalaService,
    private readonly buscarUsuariosEnSalaService: BuscarUsuariosEnSalaService,
    private readonly cargandoService: CargandoService
  ) {
  }

  ngOnInit(): void {
    this.cargandoService.habilitarCargando();
    this.activatedRoute
      .params
      .subscribe(
        parametrosRuta => {
          this.idSala = parametrosRuta.idSala;
          this.verificarRolUsuario();
          this.setearNombreSala();
          this.verificarUsuarioEnSala();
          this.cargandoService.deshabilitarCargando();
        },
        error => {
          this.cargandoService.deshabilitarCargando();
          console.error({
            error,
            mensaje: 'Error cargando los parámetros de ruta'
          });
        }
      );
  }

  verificarRolUsuario(): void {
    this.usuarioService
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
    this.buscarUsuariosEnSalaService
      .watch({
        sala: this.idSala,
        usuario: localStorage.getItem('usuario')
      })
      .valueChanges
      .subscribe(
        (usuario) => {
          this.existeUsuarioEnSala = usuario.data.usuarioSalas.length > 0;

          if (!this.esAdmin) {
            if (!this.existeUsuarioEnSala) {
              this.usuarioSalaService.unirseASala(
                this.idSala,
                localStorage.getItem('usuario')
              );
            } else {
              const idUsuarioEnSala: string = usuario.data.usuarioSalas[0].id;
              this.usuarioSalaService.accionesUsuarioEnSala(
                idUsuarioEnSala,
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
    this.salaService
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
