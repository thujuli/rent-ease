import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ProviderType } from '~/common/constants/provider-type';
import { RoleType } from '~/common/constants/role-type';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: RoleType })
  @IsNotEmpty()
  @IsEnum(RoleType)
  role: RoleType;

  @ApiProperty({ enum: ProviderType })
  @IsNotEmpty()
  @IsEnum(ProviderType)
  provider: ProviderType;
}
