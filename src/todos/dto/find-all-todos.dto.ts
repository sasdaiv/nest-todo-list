import { IsOptional, IsIn } from 'class-validator';

export class FindTodosDto {
  @IsOptional()
  @IsIn(['active', 'completed'])
  status?: 'active' | 'completed';
}
