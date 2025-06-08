import {
  Controller, Get, Post, Put, Delete, Param, Body,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from '@prisma/client';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Categoria> {
    return this.categoriasService.findOne(Number(id));
  }

@Post()
async create(@Body() data: CreateCategoriaDto): Promise<Categoria> {
  try {
    return await this.categoriasService.create(data);
  } catch (error) {
    throw new HttpException(
      error.message || 'Erro ao criar categoria',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}


  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateCategoriaDto): Promise<Categoria> {
    return this.categoriasService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Categoria> {
    return this.categoriasService.remove(Number(id));
  }
}
