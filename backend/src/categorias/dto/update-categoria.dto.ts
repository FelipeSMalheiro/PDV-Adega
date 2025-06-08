import { IsString, IsOptional } from 'class-validator';

export class UpdateCategoriaDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}
