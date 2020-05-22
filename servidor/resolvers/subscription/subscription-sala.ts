import {ContextoInterface} from '../../interfaces/contexto.interface';

export const subscriptionSala = {
    salaCreada: {
        subscribe: (
            padre,
            argumentos,
            contexto: ContextoInterface,
        ) => {
            return contexto.db.$subscribe.sala({
                mutation_in: ['CREATED']
            }).node();
        },
        resolve: salaCreada => {
            return salaCreada
        }
    }
};