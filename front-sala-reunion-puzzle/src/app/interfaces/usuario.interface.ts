import {UsuarioSalaInterface} from './usuario-sala.interface';
import {DiagramaUsuario} from '../../servidor/generated/prisma-client';

export interface UsuarioInterface {
  id?: string;
  nombre?: string;
  password?: string;
  esAdmin?: boolean;
  usuariosEnSala?: UsuarioSalaInterface[];
  diagramasPorUsuario?: DiagramaUsuario[];
}
