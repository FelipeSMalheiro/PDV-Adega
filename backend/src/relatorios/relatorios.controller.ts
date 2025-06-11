import { Controller, Get, Query } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';

@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @Get('por-dia')
  totalPorDia() {
    return this.relatoriosService.totalPorDia();
  }

  @Get('por-produto')
async totalPorProduto(
  @Query('inicio') inicio?: string,
  @Query('fim') fim?: string,
) {
  return this.relatoriosService.totalPorProduto(inicio, fim);
}

@Get('por-funcionario')
async totalPorFuncionario(
  @Query('inicio') inicio?: string,
  @Query('fim') fim?: string,
) {
  return this.relatoriosService.totalPorFuncionario(inicio, fim);
}


  @Get('por-periodo')
  totalPorPeriodo(@Query('inicio') inicio: string, @Query('fim') fim: string) {
    return this.relatoriosService.totalPorPeriodo(inicio, fim);
  }
}
