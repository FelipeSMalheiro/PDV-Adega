import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RelatoriosService {
  constructor(private readonly prisma: PrismaService) {}

  async totalPorDia() {
    return this.prisma.pedido.groupBy({
      by: ['data_pedido'],
      _sum: {
        total: true,
      },
      orderBy: {
        data_pedido: 'asc',
      },
    });
  }

async totalPorProduto(inicio?: string, fim?: string) {
  const wherePedido = inicio && fim
    ? {
        pedido: {
          data_pedido: {
            gte: new Date(inicio),
            lte: new Date(fim),
          },
        },
      }
    : {};

  const agrupado = await this.prisma.itemPedido.groupBy({
    by: ['id_produto'],
    where: wherePedido,
    _sum: {
      quantidade: true,
      preco_unitario: true,
    },
    orderBy: {
      id_produto: 'asc',
    },
  });

  const resultado = await Promise.all(
    agrupado.map(async (grupo) => {
      const produto = await this.prisma.produto.findUnique({
        where: { id: grupo.id_produto },
        select: { nome: true },
      });

      return {
        id_produto: grupo.id_produto,
        nome: produto?.nome || 'Desconhecido',
        quantidade_vendida: grupo._sum.quantidade ?? 0,
        receita_total: (grupo._sum.quantidade ?? 0) * (grupo._sum.preco_unitario ?? 0),
      };
    }),
  );

  return resultado;
}



async totalPorFuncionario(inicio?: string, fim?: string) {
  const where = inicio && fim
    ? {
        data_pedido: {
          gte: new Date(inicio),
          lte: new Date(fim),
        },
      }
    : {};

  const agrupado = await this.prisma.pedido.groupBy({
    by: ['id_funcionario'],
    where,
    _sum: {
      total: true,
    },
    orderBy: {
      id_funcionario: 'asc',
    },
  });

  const resultado = await Promise.all(
    agrupado.map(async (grupo) => {
      const funcionario = await this.prisma.funcionario.findUnique({
        where: { id: grupo.id_funcionario },
        select: { nome: true },
      });

      return {
        id_funcionario: grupo.id_funcionario,
        nome: funcionario?.nome || 'Desconhecido',
        total_vendido: grupo._sum.total ?? 0,
      };
    }),
  );

  return resultado;
}



  async totalPorPeriodo(inicio: string, fim: string) {
    return this.prisma.pedido.findMany({
      where: {
        data_pedido: {
          gte: new Date(inicio),
          lte: new Date(fim),
        },
      },
      include: {
        funcionario: true,
        itensPedido: {
          include: { produto: true },
        },
      },
      orderBy: { data_pedido: 'asc' },
    });
  }
}
