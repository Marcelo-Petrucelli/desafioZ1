import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class Session {

   @PrimaryKey()
   id!: number;

   @Property()
   active!: boolean;

   @Property()
   token!: String;

   @Property()
   startingDate = new Date();

   @Property({ onUpdate: () => new Date() })
   updatedDate = new Date();

   @Property()
   endingDate!: Date;

   @ManyToOne({ lazy: true })
   user!: User;

}