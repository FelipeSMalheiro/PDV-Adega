import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNumber()
  preco: number;

  @IsNumber()
  estoque: number;

  @IsNumber()
  quantidade: number;

  @IsString()
  unidade_medida: string;

  @IsOptional()
  @IsString()
  imagem_url?: string;

  @IsNumber()
  id_categoria: number;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
