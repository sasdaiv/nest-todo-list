import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TodosUsingPrismaService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTodosUsingPrismaDto: Prisma.TodoCreateInput) {
    return this.databaseService.todo.create({
      data: createTodosUsingPrismaDto,
    });
  }

  async findAll(status?: 'active' | 'completed') {
    if (status) {
      return this.databaseService.todo.findMany({
        where: {
          status,
        },
      });
    }
    return this.databaseService.todo.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.todo.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTodosUsingPrismaDto: Prisma.TodoUpdateInput) {
    return this.databaseService.todo.update({
      where: {
        id,
      },
      data: updateTodosUsingPrismaDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.todo.delete({
      where: {
        id,
      },
    });
  }
}
