import { Module } from '@nestjs/common';
import { TodosUsingPrismaService } from './todos-using-prisma.service';
import { TodosUsingPrismaController } from './todos-using-prisma.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TodosUsingPrismaController],
  providers: [TodosUsingPrismaService],
})
export class TodosUsingPrismaModule {}
