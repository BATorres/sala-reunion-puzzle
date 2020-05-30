import {ContextoInterface} from '../../interfaces/contexto.interface';

export const queryUsuarios = {
    findOneUsuario(
        padre,
        {idUsuario},
        contexto: ContextoInterface
    ) {
        return contexto.db.usuario({
                id: idUsuario
            }
        )
    },

    findAllUsuarios(
        padre,
        {idUsuario},
        contexto: ContextoInterface
    ) {
        return contexto.db.usuarios({
            where: {
                id: idUsuario
            }
        })
    }
};
