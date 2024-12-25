import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

@Entity()
export class Grocery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @Column('float')
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @Column('int', { default: 0 })
  @IsNumber({}, { message: 'Inventory must be a number' })
  @Min(0, { message: 'Inventory cannot be negative' })
  inventory: number;
}
