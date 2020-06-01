import {ContextoInterface} from '../../interfaces/contexto.interface';
import {UsuarioCreateInput} from '../../generated/prisma-client';

export const mutationUsuarios = {
    async crearUsuario(
        padre: any,
        {nombre, esAdmin}: UsuarioCreateInput,
        contexto: ContextoInterface,
    ) {
        return contexto.db.createUsuario(
            {
                nombre,
                esAdmin
            },
        );
        /*const usuariosRegistrados = await contexto.db.usuarios({
            where: {
                nombre: nombre
            }
        });

        const existeUsuario = usuariosRegistrados.length > 0;

        if (existeUsuario) {
            throw new Error('El usuario que desea ingresar ya se encuentra registrado')
        } else {
            return contexto.db.createUsuario(
                {
                    nombre,
                    esAdmin
                },
            );
        }*/
    }
};
