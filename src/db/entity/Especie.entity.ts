import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Pet } from './Pet.entity';

@Entity()
export class Especie extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Pet, (pet) => pet.specie)
  @JoinColumn()
  pet: Pet[];
}
