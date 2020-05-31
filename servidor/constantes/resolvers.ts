import {querySalas} from '../resolvers/query/query-salas';
import {mutationSalas} from '../resolvers/mutation/mutation-salas';
import {mutationUsuarios} from '../resolvers/mutation/mutation-usuarios';
import {queryUsuarios} from '../resolvers/query/query-usuarios';
import {ContextoInterface} from '../interfaces/contexto.interface';
import {queryUsuariosSala} from '../resolvers/query/query-usuarios-sala';
import {mutationUsuariosSala} from '../resolvers/mutation/mutation-usuarios-sala';

export default {
    Query: {
        ...querySalas,
        ...queryUsuarios,
        ...queryUsuariosSala
    },
    Mutation: {
        ...mutationSalas,
        ...mutationUsuarios,
        ...mutationUsuariosSala
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
    },
    Usuario: {
        usuariosEnSala(
            padre,
            argumentos,
            contexto: ContextoInterface
        ) {
            return contexto.db.usuario({
                id: padre.id
            }).usuariosEnSala();
        }
    },
};
