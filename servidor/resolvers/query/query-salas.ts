import {ContextoInterface} from '../../interfaces/contexto.interface';

export const querySalas = {
    buscarSala(
        padre,
        argumentos,
        contexto: ContextoInterface,
        informacion
    ) {
        return contexto.db.salas({
            skip: 0
        });
    }
};
