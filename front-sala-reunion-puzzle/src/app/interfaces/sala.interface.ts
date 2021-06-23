import {UsuarioSalaInterface} from './usuario-sala.interface';
import {DiagramaUsuario} from '../../servidor/generated/prisma-client';
import {TemaSalaInterface} from './tema-sala.interface';

export interface SalaInterface {
  id?: string;
  nombre?: string;
  descripcion?: string;
  usuariosEnSala?: UsuarioSalaInterface[];
  diagramasPorUsuario?: DiagramaUsuario[];
  temasDeSala?: TemaSalaInterface[];
}
