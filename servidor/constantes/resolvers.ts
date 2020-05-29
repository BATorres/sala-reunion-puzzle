import {querySalas} from '../resolvers/query/query-salas';
import {mutationSalas} from '../resolvers/mutation/mutation-salas';
import {mutationUsuarios} from '../resolvers/mutation/mutation-usuarios';
import {queryUsuarios} from '../resolvers/query/query-usuarios';
import {ContextoInterface} from '../interfaces/contexto.interface';

export default {
    Query: {
        ...querySalas,
        ...queryUsuarios
    },
    Mutation: {
        ...mutationSalas,
        ...mutationUsuarios
    },
    Sala: {
        usuariosEnSala(
            padre,
            argumentos,
            contexto: ContextoInterface
        ) {
            return contexto.db.sala({
                id: padre.id
            }).usuariosEnSala();
        }
    },
    UsuarioSala: {
        sala(
            padre,
            argumentos,
            contexto: ContextoInterface
        ) {
            return contexto.db.usuarioSala({
                id: padre.id
            }).sala()
        },
        usuario(
            padre,
            argumentos,
            contexto: ContextoInterface
        ) {
            return contexto.db.usuarioSala({
                id: padre.id
            }).usuario()
        }
    }
};
