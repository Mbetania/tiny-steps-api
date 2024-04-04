import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ERole } from 'src/domain';

export class OnboardingDTO {
  @ApiProperty({
    description: 'User name',
    example: 'Lucas Prodan',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'User email',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User role',
    type: ERole.NOT_ASSIGNED,
  })
  @IsNotEmpty()
  @IsString()
  role: ERole.NOT_ASSIGNED;
}

export class RequestRecoveryDTO {
  @ApiProperty({
    description: 'User email',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class ChangePasswordDTO {
  @ApiProperty({
    description: 'User new password',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
