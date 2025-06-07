import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateFuncionarioDto {
  @IsString()
  nome: string;

  @IsString()
  cpf: string;

  @IsString()
  senha: string;

  @IsString()
  cargo: string;

  @IsOptional()
  @IsBoolean()
  ativo: boolean;
}
