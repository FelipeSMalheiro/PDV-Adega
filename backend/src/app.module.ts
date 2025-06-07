import { Module } from '@nestjs/common';
import { FuncionariosController } from './funcionarios/funcionarios.controller';
import { FuncionariosService } from './funcionarios/funcionarios.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'CHAVESECRETA', // coloque em .env no futuro
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [FuncionariosController, AuthController],
  providers: [FuncionariosService, AuthService, PrismaService],
})
export class AppModule {}




