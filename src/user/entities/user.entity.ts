import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsNotEmpty, IsString, IsIn } from 'class-validator';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Username should not be empty' })
  @IsString()
  username: string;

  @Column()
  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString()
  password: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty({ message: 'Role should not be empty' })
  @IsString()
  @IsIn(['admin', 'user'], { message: 'Role must be either admin or user' })
  role: string;
}
