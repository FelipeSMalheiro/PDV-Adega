import { Module } from '@nestjs/common';
import { FuncionariosController } from './funcionarios/funcionarios.controller';
import { FuncionariosService } from './funcionarios/funcionarios.service';

@Module({
  imports: [],
  controllers: [FuncionariosController],
  providers: [FuncionariosService],
})
export class AppModule {}

