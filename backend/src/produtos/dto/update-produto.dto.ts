import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class UpdateProdutoDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsNumber()
  preco?: number;

  @IsOptional()
  @IsNumber()
  estoque?: number;

  @IsOptional()
  @IsNumber()
  quantidade?: number;

  @IsOptional()
  @IsString()
  unidade_medida?: string;

  @IsOptional()
  @IsString()
  imagem_url?: string;

  @IsOptional()
  @IsNumber()
  id_categoria?: number;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
