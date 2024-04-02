import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(['active', 'completed'], {
    message: 'Status must be "active" or "completed"',
  })
  status: 'active' | 'completed';
}
