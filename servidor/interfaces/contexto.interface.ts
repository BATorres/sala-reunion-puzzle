import {Prisma} from '../generated/prisma-client';

export interface ContextoInterface {
    db: Prisma
    request: any
}