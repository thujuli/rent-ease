import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from '~/auth/dtos/register.dto';
import { PrismaService } from '~/common/services/prisma/prisma.service';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return registerDto;
  }
}
