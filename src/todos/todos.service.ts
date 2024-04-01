import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  private todos = [];
  findAll(status?: 'active' | 'completed') {
    if (status) {
      return this.todos.filter((todo) => todo.status === status);
    } else {
      return this.todos;
    }
  }
}
