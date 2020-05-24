import {querySalas} from '../resolvers/query/query-salas';
import {mutationSalas} from '../resolvers/mutation/mutation-salas';
import {mutationUsuarios} from '../resolvers/mutation/mutation-usuarios';
import {ContextoInterface} from '../interfaces/contexto.interface';
import {subscriptionSala} from '../resolvers/subscription/subscription-sala';

export default {
    Subscription: {
        ...subscriptionSala,
        usuarioCreadoSubs: {
            subscribe: (
                padre,
                argumentos,
                contexto: ContextoInterface,
            ) => {
                return contexto.db.$subscribe.usuario({
                    mutation_in: ['CREATED']
                }).node();
            },
            resolve: payload => {
                return payload
            }
        }
    },
    Query: {
        ...querySalas
    },
    Mutation: {
        ...mutationSalas,
        ...mutationUsuarios
    }
};
