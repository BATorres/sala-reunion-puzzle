import {ContextoInterface} from '../../interfaces/contexto.interface';
import {SalaCreateInput, UsuarioSalaCreateInput} from '../../generated/prisma-client';

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
        const usuarioUnido = await contexto.db.usuarioSalas({
           where: {
               AND: [
                   {
                       sala: {
                           id_contains: idSala
                       }
                   },
                   {
                       usuario: {
                           id_contains: idUsuario
                       }
                   }
               ]
           }
        });
        return contexto.db.createUsuarioSala({
            sala: {
                connect: {
                    id: idSala
                }
            },
            usuario: {
                connect: {
                    id: idUsuario
                }
            }
        })
    }
};
