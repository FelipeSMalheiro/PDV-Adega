import { Controller, Get } from '@nestjs/common';
import { PedidosService } from '../pedidos/pedidos.service';
import { Pedido } from '@prisma/client';

@Controller('historico')
export class HistoricoController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Get()
  async getHistorico(): Promise<Pedido[]> {
    return this.pedidosService.findAll();
  }
}
