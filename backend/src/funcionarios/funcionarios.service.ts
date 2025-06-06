import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient, Funcionario } from '@prisma/client';

@Injectable()
export class FuncionariosService {
  private prisma = new PrismaClient();

  async findAll(): Promise<Funcionario[]> {
    try {
      return await this.prisma.funcionario.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar funcionários.');
    }
  }

  async findOne(id: number): Promise<Funcionario> {
    try {
      const funcionario = await this.prisma.funcionario.findUnique({ where: { id } });
      if (!funcionario) {
        throw new NotFoundException(`Funcionário com id ${id} não encontrado.`);
      }
      return funcionario;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Erro ao buscar funcionário.');
    }
  }

  async create(data: Omit<Funcionario, 'id'>): Promise<Funcionario> {
    try {
      return await this.prisma.funcionario.create({ data });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar funcionário.');
    }
  }

  async update(id: number, data: Partial<Funcionario>): Promise<Funcionario> {
    try {
      const funcionario = await this.prisma.funcionario.findUnique({ where: { id } });
      if (!funcionario) {
        throw new NotFoundException(`Funcionário com id ${id} não encontrado.`);
      }
      return await this.prisma.funcionario.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Erro ao atualizar funcionário.');
    }
  }

  async remove(id: number): Promise<Funcionario> {
    try {
      const funcionario = await this.prisma.funcionario.findUnique({ where: { id } });
      if (!funcionario) {
        throw new NotFoundException(`Funcionário com id ${id} não encontrado.`);
      }
      return await this.prisma.funcionario.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Erro ao deletar funcionário.');
    }
  }
}
