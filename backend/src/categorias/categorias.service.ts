import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from '@prisma/client';

@Injectable()
export class CategoriasService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Categoria[]> {
    return this.prisma.categoria.findMany();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.prisma.categoria.findUnique({ where: { id } });
    if (!categoria) throw new NotFoundException(`Categoria ${id} não encontrada.`);
    return categoria;
  }

  async create(data: CreateCategoriaDto): Promise<Categoria> {
  try {
    return await this.prisma.categoria.create({ data });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    throw new Error('Erro interno ao criar categoria');
  }
}

async update(id: number, data: UpdateCategoriaDto): Promise<Categoria> {
  try {
    await this.findOne(id);
    return await this.prisma.categoria.update({ where: { id }, data });
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    throw new Error('Erro interno ao atualizar categoria');
  }
}

  async remove(id: number): Promise<Categoria> {
    await this.findOne(id);
    return this.prisma.categoria.delete({ where: { id } });
  }
}
