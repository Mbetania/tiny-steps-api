import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignInDTO {
  @ApiProperty({ type: String })
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class TokenParloadDTO {
  _id: string;
  iat?: number;
  exp?: number;
}
