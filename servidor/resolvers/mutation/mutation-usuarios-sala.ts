import {ContextoInterface} from '../../interfaces/contexto.interface';

export const mutationUsuariosSala = {
    async pedirLaPalabra(
        padre,
        {idUsuario, idSala},
        contexto: ContextoInterface
    ) {
        const usuarioSala = await contexto.db.usuarioSalas({
            where: {
                AND: [
                    {
                        sala: {
                            id: idSala
                        }
                    },
                    {
                        usuario: {
                            id: idUsuario
                        }
                    }
                ]
            }
        });

        return contexto.db.updateUsuarioSala({
            data: {
                levantarMano: true
            },
            where: {
                id: usuarioSala[0].id
            }
        });
    },
};
