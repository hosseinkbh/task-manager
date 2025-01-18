import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id'])
export class User {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  firstName!: string;
  @Column({ type: 'varchar', length: 50 })
  lastName!: string;

  @Column({ type: 'number', length: 11 })
  phoneNumber!: string;

  @Column({ type: 'varchar', length: 45 })
  email!: string;

  @Column({ type: 'varchar', length: 40 })
  password!: string;
}
