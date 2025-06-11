import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Pedido } from '@prisma/client';

@Injectable()
export class PedidosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePedidoDto): Promise<Pedido> {
    const { id_funcionario, cpf_comprador, forma_pagamento, itens } = data;
    let total = 0;

    try {
      // Validação dos itens
      for (const item of itens) {
        const produto = await this.prisma.produto.findUnique({
          where: { id: item.id_produto },
        });

        if (!produto) {
          throw new NotFoundException(`Produto com ID ${item.id_produto} não encontrado.`);
        }

        if (!produto.ativo) {
          throw new BadRequestException(`Produto "${produto.nome}" está inativo.`);
        }

        if (produto.estoque < item.quantidade) {
          throw new BadRequestException(
            `Estoque insuficiente para o produto "${produto.nome}". Disponível: ${produto.estoque}`,
          );
        }

        total += item.quantidade * produto.preco;
      }

      // Criação do pedido
      const pedido = await this.prisma.pedido.create({
        data: {
          id_funcionario,
          cpf_comprador,
          forma_pagamento,
          total,
          data_pedido: new Date(),
        },
      });

      // Inserção dos itens e atualização de estoque
      for (const item of itens) {
        const produto = await this.prisma.produto.findUnique({ where: { id: item.id_produto } });

        await this.prisma.itemPedido.create({
          data: {
            id_pedido: pedido.id,
            id_produto: item.id_produto,
            quantidade: item.quantidade,
            preco_unitario: produto!.preco,
          },
        });

        await this.prisma.produto.update({
          where: { id: item.id_produto },
          data: {
            estoque: produto!.estoque - item.quantidade,
          },
        });
      }

      return pedido;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro interno ao processar o pedido.');
    }
  }

  async findAll(): Promise<Pedido[]> {
    return this.prisma.pedido.findMany({
      include: {
        funcionario: true,
        itensPedido: {
          include: { produto: true },
        },
      },
    });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        funcionario: true,
        itensPedido: {
          include: { produto: true },
        },
      },
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado.`);
    }

    return pedido;
  }
}
