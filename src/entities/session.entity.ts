import { Entity, EntityRepositoryType, OneToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { SessionRepository } from './session.repository';
import { User } from 'src/entities/user.entity';

@Entity({ repository: () => SessionRepository })
export class Session {

  [EntityRepositoryType]?: SessionRepository;
  [OptionalProps]?: 'startingDate' | 'updatedDate';

  @PrimaryKey()
  id!: number;

  @Property({ type: 'text'})
  token!: String;

  @Property()
  startingDate = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedDate = new Date();

  @Property()
  endingDate!: Date;

  @OneToOne({ mappedBy: 'session', lazy: true })
  user!: User;

}