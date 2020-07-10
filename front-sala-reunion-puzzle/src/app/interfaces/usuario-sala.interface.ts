import {SalaInterface} from './sala.interface';
import {UsuarioInterface} from './usuario.interface';

export interface UsuarioSalaInterface {
  id?: string;
  sala?: SalaInterface;
  usuario?: UsuarioInterface;
}
