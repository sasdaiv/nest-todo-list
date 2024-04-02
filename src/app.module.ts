import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { DatabaseModule } from './database/database.module';
import { TodosUsingPrismaModule } from './todos-using-prisma/todos-using-prisma.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';

@Module({
  imports: [
    TodosModule,
    DatabaseModule,
    TodosUsingPrismaModule,
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 3 },
      { name: 'long', ttl: 60000, limit: 100 },
    ]),
    CustomLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
