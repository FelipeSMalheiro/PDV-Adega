import { Module } from '@nestjs/common';
import { FuncionariosController } from './funcionarios/funcionarios.controller';
import { FuncionariosService } from './funcionarios/funcionarios.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { CategoriasController } from './categorias/categorias.controller';
import { CategoriasService } from './categorias/categorias.service';
import { ProdutosController } from './produtos/produtos.controller';
import { ProdutosService } from './produtos/produtos.service';
import { PedidosController } from './pedidos/pedidos.controller';
import { PedidosService } from './pedidos/pedidos.service';
import { RelatoriosController } from './relatorios/relatorios.controller';
import { RelatoriosService } from './relatorios/relatorios.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'CHAVESECRETA', // coloque em .env no futuro
      signOptions: { expiresIn: '1d' },
    }),
  ],
  
  controllers: [FuncionariosController, AuthController, CategoriasController, 
    ProdutosController, PedidosController, RelatoriosController],

  providers: [FuncionariosService, AuthService, PrismaService, CategoriasService, 
    ProdutosService, PedidosService, RelatoriosService],
})
export class AppModule {}




