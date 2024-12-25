import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Grocery } from '../groceries/entities/grocery.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Grocery]),
  ],
})
export class DatabaseModule {
  constructor(private dataSource: DataSource) {
    this.seedUsers();
    this.seedGroceries();
  }

  async seedUsers() {
    const userRepository = this.dataSource.getRepository(User);
    const users = await userRepository.find();
    if (users.length === 0) {
      const defaultUsers = [
        { username: 'admin', password: 'adminpass', role: 'admin' },
        { username: 'user', password: 'userpass', role: 'user' },
      ];
      await userRepository.save(defaultUsers);
    }
  }

  async seedGroceries() {
    const groceryRepository = this.dataSource.getRepository(Grocery);
    const groceries = await groceryRepository.find();
    if (groceries.length === 0) {
      const defaultGroceries = [
        { name: 'Apple', price: 1.2, inventory: 100 },
        { name: 'Banana', price: 0.5, inventory: 150 },
        { name: 'Carrot', price: 0.8, inventory: 200 },
        { name: 'Tomato', price: 1.0, inventory: 120 },
        { name: 'Potato', price: 0.6, inventory: 180 },
        { name: 'Onion', price: 0.7, inventory: 160 },
        { name: 'Milk', price: 1.5, inventory: 80 },
        { name: 'Bread', price: 2.0, inventory: 50 },
        { name: 'Eggs', price: 3.0, inventory: 70 },
        { name: 'Cheese', price: 4.0, inventory: 60 },
      ];
      await groceryRepository.save(defaultGroceries);
    }
  }
}
