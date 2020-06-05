import {ContextoInterface} from '../../interfaces/contexto.interface';

export const mutationDiagramaUsuario = {
    async guardarDiagramaUsuario(
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
        const existeDiagramaUsuario: boolean = diagramaUsuario.length > 0;
        if (!existeDiagramaUsuario) {
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
        } else {
            return contexto.db.updateDiagramaUsuario({
                where: {
                    id: diagramaUsuario[0].id
                },
                data: {
                    diagrama: {
                        update: {
                            datos: datos
                        }
                    }
                }
            })
        }
    },
};
