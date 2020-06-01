import {ContextoInterface} from '../../interfaces/contexto.interface';

export const queryUsuariosSala = {
    findAllUsuariosEnSala(
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
