import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  private todos = [
    { id: 1, title: 'Todo 1', status: 'active' },
    { id: 2, title: 'Todo 2', status: 'active' },
    { id: 3, title: 'Todo 3', status: 'completed' },
  ];
  findAll(status?: 'active' | 'completed') {
    if (status) {
      return this.todos.filter((todo) => todo.status === status);
    } else {
      return this.todos;
    }
  }
  findOne(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }
  create(newTodo: CreateTodoDto) {
    const newTodoWithID = {
      id: this.todos[this.todos.length - 1].id + 1,
      ...newTodo,
    };
    this.todos.push(newTodoWithID);
    return newTodo;
  }
  update(id: number, todoToUpdate: UpdateTodoDto) {
    const updatedTodoInDB = this.findOne(id);
    if (!updatedTodoInDB) {
      throw new NotFoundException('Todo not found');
    }
    const updatedTodo = { ...updatedTodoInDB, ...todoToUpdate };
    this.todos = this.todos.map((todo) =>
      todo.id === id ? updatedTodo : todo,
    );
    return updatedTodo;
  }
  remove(id: number) {
    const removedUser = this.findOne(id);
    if (removedUser) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      return removedUser;
    }
    return;
  }
}
