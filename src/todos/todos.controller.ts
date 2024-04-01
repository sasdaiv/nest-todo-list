import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('todos')
export class TodosController {
  @Get()
  findAll(@Query('status') status?: 'active' | 'completed') {
    return [];
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return id;
  }
  @Post()
  create(@Body() todo: {}) {
    return todo;
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return id;
  }
  @Patch(':id')
  update(@Param('id') id: string) {
    return id;
  }
}
