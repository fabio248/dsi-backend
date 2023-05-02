import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Person } from './Person';
import { User } from './User';

@Entity()
export class Client extends Person {
  @Column({ length: 10 })
  dui: string;

  @Column()
  phone: string;

  @Column()
  direction: string;

  @Column()
  gender: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
