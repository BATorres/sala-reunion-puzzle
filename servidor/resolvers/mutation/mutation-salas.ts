import {ContextoInterface} from '../../interfaces/contexto.interface';
import {SalaCreateInput} from '../../generated/prisma-client';

export const mutationSalas = {
    async crearSala(
        padre: any,
        {nombre}: SalaCreateInput,
        contexto: ContextoInterface,
    ) {
        return contexto.db.createSala(
            {
                nombre
            },
        );
    },

    async unirseSala(
        padre,
        {idSala, idUsuario},
        contexto: ContextoInterface
    ) {
        return contexto.db.createUsuarioSala({
            sala: {
                connect: idSala
            },
            usuario: {
                connect: idUsuario
            }
        })
    }
};
