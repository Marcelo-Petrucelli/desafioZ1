import { EntityRepository } from '@mikro-orm/mysql';
import { Session } from 'src/entities/session.entity';

export class SessionRepository extends EntityRepository<Session> {
    
}