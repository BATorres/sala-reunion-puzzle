import {DiagramaUsuario} from '../../servidor/generated/prisma-client';

export interface DiagramaInterface {
  id?: string;
  datos?: string;
  diagramasPorUsuario?: DiagramaUsuario[];
}
