import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id', 'phoneNumber', 'email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @MinLength(2)
  @MaxLength(50)
  @Column({ type: 'varchar', length: 50 })
  firstName!: string;

  @MinLength(2)
  @MaxLength(50)
  @Column({ type: 'varchar', length: 50 })
  lastName!: string;

  @MinLength(11)
  @MaxLength(11)
  @Column({ type: 'number', length: 11 })
  phoneNumber!: string;

  @MinLength(6)
  @MaxLength(100)
  @IsEmail()
  @Column({ type: 'varchar', length: 100 })
  email!: string;

  @MinLength(6)
  @MaxLength(200)
  @Column({ type: 'varchar', length: 200 })
  password!: string;
}
