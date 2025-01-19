import { MaxLength, MinLength } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @MinLength(2)
  @MaxLength(20)
  @Column({ type: 'varchar', length: 20, nullable: false })
  firstName!: string;

  @MinLength(2)
  @MaxLength(20)
  @Column({ type: 'varchar', length: 20, nullable: false })
  lastName!: string;

  @MinLength(11)
  @MaxLength(11)
  @Column({ type: 'varchar', length: 11, nullable: false })
  phoneNumber!: string;

  @MinLength(7)
  @MaxLength(50)
  @Column({ type: 'varchar', length: 50, nullable: false })
  email!: string;

  @MinLength(8)
  @MaxLength(150)
  @Column({ type: 'varchar', length: 150, nullable: false })
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
