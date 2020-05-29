import {ContextoInterface} from '../../interfaces/contexto.interface';

export const querySalas = {
    findAllSalas(
        padre: any,
        argumentos: any,
        contexto: ContextoInterface
    ) {
        return contexto.db.salas({
            orderBy: 'createdAt_DESC'
        });
    },

    findOneSala(
        padre,
        {idSala},
        contexto: ContextoInterface
    ) {
        return contexto.db.sala({
            id: idSala
        });
    },

    buscarUsuariosEnSala(
        padre,
        {idSala},
        contexto: ContextoInterface
    ) {
        return contexto.db.usuarioSalas({
            where: {
                sala: {
                    id: idSala
                }
            },
            orderBy: 'createdAt_DESC'
        })
    }
};
