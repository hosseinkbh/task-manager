import { MaxLength, MinLength } from 'class-validator';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
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
}
