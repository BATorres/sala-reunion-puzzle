import {ContextoInterface} from '../../interfaces/contexto.interface';

export const mutationUsuariosSala = {
    async accionesUsuarioSala(
        padre,
        {idUsuario, idSala, tipoAccion},
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

        if (tipoAccion === 'Pedir la palabra') {
            return contexto.db.updateUsuarioSala({
                data: {
                    levantarMano: true,
                    compartirPantalla: false,
                },
                where: {
                    id: usuarioSala[0].id
                }
            });
        }

        if (tipoAccion === 'Compartir pantalla') {
            return contexto.db.updateUsuarioSala({
                data: {
                    levantarMano: false,
                    compartirPantalla: true
                },
                where: {
                    id: usuarioSala[0].id
                }
            });
        }

        if (tipoAccion === 'Cancelar') {
            return contexto.db.updateUsuarioSala({
                data: {
                    levantarMano: false,
                    compartirPantalla: false
                },
                where: {
                    id: usuarioSala[0].id
                }
            });
        }
    },
};
