import {ContextoInterface} from '../../interfaces/contexto.interface';

export const querySalas = {
    buscarSala(
        padre: any,
        argumentos: any,
        contexto: ContextoInterface,
        informacion: any
    ) {
        return contexto.db.salas({
            skip: 0
        });
    }
};
