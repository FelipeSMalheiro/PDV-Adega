import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Funcionario } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FuncionariosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Funcionario[]> {
    return this.prisma.funcionario.findMany();
  }

  async findOne(id: number): Promise<Funcionario> {
    const funcionario = await this.prisma.funcionario.findUnique({ where: { id } });
    if (!funcionario) throw new NotFoundException(`Funcionário com id ${id} não encontrado.`);
    return funcionario;
  }

  async create(data: Omit<Funcionario, 'id'>): Promise<Funcionario> {
    try {
      const hashedSenha = await bcrypt.hash(data.senha, 10);
      return await this.prisma.funcionario.create({
        data: { ...data, senha: hashedSenha },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error('Já existe um funcionário com esse e-mail ou CPF.');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, data: Partial<Funcionario>): Promise<Funcionario> {
    const funcionario = await this.findOne(id);
    if (data.senha) data.senha = await bcrypt.hash(data.senha, 10);
    return this.prisma.funcionario.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Funcionario> {
    await this.findOne(id);
    return this.prisma.funcionario.delete({ where: { id } });
  }
}

