import {SalaInterface} from './sala.interface';
import {UsuarioInterface} from './usuario.interface';

export interface UsuarioSalaInterface {
  id?: string;
  levantarMano?: boolean;
  compartirPantalla?: boolean;
  sala?: SalaInterface;
  usuario?: UsuarioInterface;
}
