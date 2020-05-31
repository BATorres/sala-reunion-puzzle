import {ContextoInterface} from '../../interfaces/contexto.interface';

export const mutationDiagramaUsuario = {
    async compartirPantalla(
        padre,
        {idSala, idUsuario, datos},
        contexto: ContextoInterface
    ) {
        const diagramaUsuario = await contexto.db.diagramaUsuarios({
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
        if (diagramaUsuario.length > 0) {
            return contexto.db.updateDiagramaUsuario({
                data: {
                    diagrama: {
                        update: {
                            datos: datos
                        }
                    }
                },
                where: {
                    id: diagramaUsuario[0].id
                }
            })
        } else {
            return contexto.db.createDiagramaUsuario({
                diagrama: {
                    create: {
                        datos: datos
                    }
                },
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
    }
};
