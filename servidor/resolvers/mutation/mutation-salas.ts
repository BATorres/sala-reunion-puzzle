import {ContextoInterface} from '../../interfaces/contexto.interface';

export const mutationSalas = {
    async crearSala(
        padre,
        {nombre},
        contexto: ContextoInterface,
        informacion
    ) {
        return contexto.db.createSala(
            {
                nombre
            },
        );
    }
};
