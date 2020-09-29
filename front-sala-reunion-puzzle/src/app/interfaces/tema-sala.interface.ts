import {SalaInterface} from './sala.interface';

export interface TemaSalaInterface {
  titulo?: string;
  fuente?: string;
  resumen?: string;
  tema?: string;
  actor?: string;
  sala?: SalaInterface | string;
}
