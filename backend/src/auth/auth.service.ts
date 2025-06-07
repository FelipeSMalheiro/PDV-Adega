import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async validateUser(cpf: string, senha: string) {
    const user = await this.prisma.funcionario.findUnique({ where: { cpf } });
    if (user && await bcrypt.compare(senha, user.senha)) {
      const { senha, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('CPF ou senha inválidos');
  }

  async login(user: any) {
    const payload = { sub: user.id, cpf: user.cpf };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
