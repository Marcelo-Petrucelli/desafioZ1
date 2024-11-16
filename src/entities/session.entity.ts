import { Entity, EntityRepositoryType, OneToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { SessionRepository } from './session.repository';
import { User } from 'src/entities/user.entity';

@Entity({ repository: () => SessionRepository })
export class Session {

  [EntityRepositoryType]?: SessionRepository;
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @PrimaryKey()
  id!: number;

  @Property({ type: 'text'})
  token!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  endingAt!: Date;

  @OneToOne({ mappedBy: 'session', lazy: true })
  user!: User;

}