import { Module } from '@nestjs/common';
import { GroceryController } from './controllers/grocery.controller';
import { GroceryService } from './services/grocery.service';
import { Grocery } from './entities/grocery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grocery]),
    JwtModule.register({
      secret: 'secretKeyQuestionPro',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [GroceryController],
  providers: [GroceryService],
})
export class GroceriesModule {}
