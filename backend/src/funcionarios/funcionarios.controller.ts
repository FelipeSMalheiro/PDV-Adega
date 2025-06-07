import {
  Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus,
} from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { Funcionario } from '@prisma/client';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionariosService: FuncionariosService) {}

  @Get()
  findAll(): Promise<Funcionario[]> {
    return this.funcionariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Funcionario> {
    return this.funcionariosService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: CreateFuncionarioDto): Promise<Funcionario> {
    return this.funcionariosService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateFuncionarioDto): Promise<Funcionario> {
    return this.funcionariosService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Funcionario> {
    return this.funcionariosService.remove(Number(id));
  }
}


