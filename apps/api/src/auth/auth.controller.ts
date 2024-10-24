import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from '~/auth/dto/register.dto';
import { ResponseMessage } from '~/common/decorators/response-message.decorator';
import { PrismaService } from '~/common/services/prisma.service';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService) {}

  @ApiOperation({ summary: 'Register user' })
  @ResponseMessage('Register user has been successful')
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return registerDto;
  }
}
