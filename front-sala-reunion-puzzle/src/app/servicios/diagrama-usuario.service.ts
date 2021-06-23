import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {BUSCAR_DIAGRAMA_GLOBAL, BUSCAR_DIAGRAMA_USUARIO} from '../constantes/query/query-diagrama-usuario';
import {Observable} from 'rxjs';
import {DiagramaUsuarioInterface} from '../interfaces/diagrama-usuario.interface';
import {map} from 'rxjs/operators';
import {ACTUALIZAR_DIAGRAMA, CREAR_DIAGRAMA} from '../constantes/mutation/mutation-diagrama-usuario';
import {Toast, ToasterService} from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class DiagramaUsuarioService {
  constructor(
    private readonly _apollo: Apollo,
    private readonly _toasterService: ToasterService
  ) {
  }

  buscarDiagramaGlobal(
    idSala: string
  ): Observable<{ diagramaUsuarios: DiagramaUsuarioInterface[] }> {
    return this._apollo
      .query<{ diagramaUsuarios: DiagramaUsuarioInterface[] }>({
        query: BUSCAR_DIAGRAMA_GLOBAL,
        fetchPolicy: 'network-only',
        variables: {
          idSala,
        }
      })
      .pipe(
        map(resultado => resultado.data)
      );
  }

  buscarDiagramaUsuario(
    idSala: string,
    idUsuario: string
  ): Observable<{ diagramaUsuarios: DiagramaUsuarioInterface[] }> {
    return this._apollo
      .query<{ diagramaUsuarios: DiagramaUsuarioInterface[] }>({
        query: BUSCAR_DIAGRAMA_USUARIO,
        fetchPolicy: 'network-only',
        variables: {
          idSala,
          idUsuario
        }
      })
      .pipe(
        map(resultado => resultado.data)
      );
  }

  private crearDiagramaUsuario(
    datos: string,
    idSala: string,
    idUsuario: string,
    esDiagramaGlobal: boolean
  ): any {
    return this._apollo
      .mutate({
        mutation: CREAR_DIAGRAMA,
        variables: {
          datos,
          idSala,
          idUsuario,
          esDiagramaGlobal
        }
      })
      .subscribe(
        () => {},
        error => {
          console.error({
            error,
            mensaje: 'Error creando diagrama usuario'
          });
        }
      );
  }

  private actualizarDiagramaUsuario(
    datos: string,
    idDiagramaSala: string
  ): any {
    return this._apollo
      .mutate({
        mutation: ACTUALIZAR_DIAGRAMA,
        variables: {
          datos,
          idDiagramaSala
        }
      })
      .subscribe(
        () => {},
        error => {
          console.error({
            error,
            mensaje: 'Error actualizando diagrama usuario'
          });
        }
      );
  }

  guardarDiagrama(
    datos: string,
    idSala: string,
    idUsuario: string
  ): any {
    return this.buscarDiagramaUsuario(
      idSala,
      idUsuario
    ).subscribe(
      (diagramaUsuario: {diagramaUsuarios: DiagramaUsuarioInterface[]}) => {
        const existeDiagramaUsuario: boolean = diagramaUsuario.diagramaUsuarios.length > 0;

        if (!existeDiagramaUsuario) {
          this.crearDiagramaUsuario(
            datos,
            idSala,
            idUsuario,
            false
          );
        } else {
          const idDiagramaUsuario = diagramaUsuario.diagramaUsuarios[0].id;
          this.actualizarDiagramaUsuario(
            datos,
            idDiagramaUsuario
          );
        }
      }
    );
  }

  guardarDiagramaGlobal(
    datos: string,
    idSala: string,
    idUsuario: string
  ): any {
    return this.buscarDiagramaGlobal(
      idSala,
    ).subscribe(
      (diagramaUsuario: {diagramaUsuarios: DiagramaUsuarioInterface[]}) => {
        const existeDiagramaUsuario: boolean = diagramaUsuario.diagramaUsuarios.length > 0;

        if (!existeDiagramaUsuario) {
          this.crearDiagramaUsuario(
            datos,
            idSala,
            idUsuario,
            true
          );
        } else {
          const idDiagramaUsuario = diagramaUsuario.diagramaUsuarios[0].id;
          this.actualizarDiagramaUsuario(
            datos,
            idDiagramaUsuario
          );
        }
        const toast: Toast = {
          type: 'success',
          title: 'ÉXITO',
          body: 'El diagrama global se ha guardado correctamente',
          showCloseButton: true,
        };

        this._toasterService.pop(
          toast
        );
      }
    );
  }
}
