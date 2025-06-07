import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { Funcionario } from '@prisma/client';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionariosService: FuncionariosService) {}

  @Get()
  async findAll(): Promise<Funcionario[]> {
    try {
      return await this.funcionariosService.findAll();
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar funcionários',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Funcionario> {
    try {
      return await this.funcionariosService.findOne(Number(id));
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Erro ao buscar funcionário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
async create(@Body() funcionarioData: Omit<Funcionario, 'id'>): Promise<Funcionario> {
  try {
    return await this.funcionariosService.create(funcionarioData);
  } catch (error) {
    if (error.message.includes('Já existe um funcionário com esse e-mail ou CPF')) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST); // 400 para erro de duplicidade
    }
    throw new HttpException(
      'Erro ao criar funcionário. Por favor, tente novamente.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}


  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() funcionarioData: Partial<Funcionario>,
  ): Promise<Funcionario> {
    try {
      return await this.funcionariosService.update(Number(id), funcionarioData);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Erro ao atualizar funcionário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Funcionario> {
    try {
      return await this.funcionariosService.remove(Number(id));
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Erro ao deletar funcionário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

