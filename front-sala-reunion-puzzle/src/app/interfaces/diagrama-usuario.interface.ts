import {DiagramaInterface} from './diagrama.interface';
import {SalaInterface} from './sala.interface';
import {UsuarioInterface} from './usuario.interface';

export interface DiagramaUsuarioInterface {
  id?: string;
  diagrama?: DiagramaInterface;
  sala?: SalaInterface;
  usuario?: UsuarioInterface;
}
