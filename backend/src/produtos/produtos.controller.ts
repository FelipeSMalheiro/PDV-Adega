import {
  Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus,
  Query
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from '@prisma/client';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  async findAll(@Query('nome') nome?: string): Promise<Produto[]> {
    return this.produtosService.findAll(nome);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Produto> {
    return this.produtosService.findOne(Number(id));
  }

  @Post()
  async create(@Body() data: CreateProdutoDto): Promise<Produto> {
    try {
      return await this.produtosService.create(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateProdutoDto): Promise<Produto> {
    try {
      return await this.produtosService.update(Number(id), data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Produto> {
    try {
      return await this.produtosService.remove(Number(id));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
