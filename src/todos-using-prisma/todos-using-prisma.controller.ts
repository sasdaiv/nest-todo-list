import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
} from '@nestjs/common';
import { TodosUsingPrismaService } from './todos-using-prisma.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { CustomLoggerModule } from 'src/custom-logger/custom-logger.module';
import { CustomLoggerService } from 'src/custom-logger/custom-logger.service';

// allow us to skip throttler limitation for requests;
@SkipThrottle()
@Controller('todos-using-prisma')
export class TodosUsingPrismaController {
  constructor(
    private readonly todosUsingPrismaService: TodosUsingPrismaService,
  ) {}
  private readonly logger = new CustomLoggerService(
    TodosUsingPrismaController.name,
  );

  @Post()
  create(@Body() newTodo: Prisma.TodoCreateInput) {
    return this.todosUsingPrismaService.create(newTodo);
  }

  //override local(for this file) throttler limitaion, force it use global
  @SkipThrottle({ default: false })
  @Get()
  findAll(@Ip() ip: string, @Query() status: 'completed' | 'active') {
    this.logger.log(`Request for all todos from ${ip}`);
    return this.todosUsingPrismaService.findAll(status);
  }

  // change global throttler limitaion to this local;
  @Throttle({
    short: {
      ttl: 1000,
      limit: 1,
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosUsingPrismaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedTodo: Prisma.TodoUpdateInput) {
    return this.todosUsingPrismaService.update(+id, updatedTodo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosUsingPrismaService.remove(+id);
  }
}
