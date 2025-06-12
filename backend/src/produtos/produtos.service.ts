import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from '@prisma/client';

@Injectable()
export class ProdutosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(nome?: string): Promise<Produto[]> {
  const filtro = nome
    ? {
        nome: {
          contains: nome,
          mode: 'insensitive', // permite buscar sem diferenciar maiúsculas/minúsculas
        },
      }
    : {};

  return this.prisma.produto.findMany({
    where: filtro,
    include: { categoria: true },
  });
}


  async findOne(id: number): Promise<Produto> {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
      include: { categoria: true },
    });
    if (!produto) throw new NotFoundException(`Produto ${id} não encontrado.`);
    return produto;
  }

async create(data: CreateProdutoDto): Promise<Produto> {
  try {
    if (data.ativo === false) {
      throw new Error('O produto precisa estar ativo para ser cadastrado.');
    }

    if (data.estoque <= 0) {
      throw new Error('O produto precisa ter estoque maior que zero.');
    }

    return await this.prisma.produto.create({ data });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw new InternalServerErrorException(error.message);
  }
}  

async update(id: number, data: UpdateProdutoDto): Promise<Produto> {
  try {
    await this.findOne(id);

    const { id: _, categoria: __, ...dadosLimpos } = data as any;

    return await this.prisma.produto.update({
      where: { id },
      data: dadosLimpos,
    });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw new InternalServerErrorException('Erro ao atualizar produto');
  }
}



  async remove(id: number): Promise<Produto> {
    try {
      await this.findOne(id);
      return await this.prisma.produto.delete({ where: { id } });
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      throw new InternalServerErrorException('Erro ao remover produto');
    }
  }
}
