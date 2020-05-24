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
    }
};
