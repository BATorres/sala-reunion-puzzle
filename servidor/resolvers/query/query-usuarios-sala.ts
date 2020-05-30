import {ContextoInterface} from '../../interfaces/contexto.interface';

export const queryUsuariosSala = {
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
    },

    verificarUsuarioEnSala(
        padre,
        {idSala, idUsuario},
        contexto: ContextoInterface
    ) {
        return contexto.db.usuarioSalas({
            where: {
                usuario: {
                    id: idUsuario
                }
            }
        })
    }
};
