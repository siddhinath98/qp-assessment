import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GroceriesModule } from './groceries/groceries.module';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './logger.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, GroceriesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
