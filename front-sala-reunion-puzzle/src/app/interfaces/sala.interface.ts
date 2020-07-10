import {UsuarioSalaInterface} from './usuario-sala.interface';
import {DiagramaUsuario} from '../../servidor/generated/prisma-client';

export interface SalaInterface {
  id?: string;
  nombre?: string;
  usuariosEnSala?: UsuarioSalaInterface[];
  diagramasPorUsuario?: DiagramaUsuario[];
}
