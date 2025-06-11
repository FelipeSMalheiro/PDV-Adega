import { IsNumber, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ItemPedidoInput {
  @IsNumber()
  id_produto: number;

  @IsNumber()
  quantidade: number;
}

export class CreatePedidoDto {
  @IsNumber()
  id_funcionario: number;

  @IsOptional()
  @IsString()
  cpf_comprador?: string;

  @IsString()
  forma_pagamento: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemPedidoInput)
  itens: ItemPedidoInput[];
}
