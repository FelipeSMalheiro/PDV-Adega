import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Pedido } from '@prisma/client';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  async create(@Body() data: CreatePedidoDto): Promise<Pedido> {
    try {
      return await this.pedidosService.create(data);
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao criar pedido',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<Pedido[]> {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Pedido> {
    try {
      return await this.pedidosService.findOne(Number(id));
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao buscar pedido',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('historico')
  async getHistorico(): Promise<Pedido[]> {
    return this.pedidosService.findAll(); // 🔁 uso direto do service
  }
}