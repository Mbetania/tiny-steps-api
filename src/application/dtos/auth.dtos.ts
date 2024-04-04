import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { PASSWORD_REGEX } from '../enums';

export class SignupDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Email to create user',
    example: 'user@mail.com',
    type: String,
    required: true,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '#My_Password_1990',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_REGEX, {
    message:
      'Invalid password, min: 1 lowercase, 1 uppercase, 1 number and 1 special character',
  })
  password: string;
}

export class SignInDTO {
  @ApiProperty({
    description: 'Email to create user',
    example: 'user@mail.com',
    type: String,
  })
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]{6}$/, {
    message: 'Invalid password, only numbers and required six digits.',
  })
  password: string;
}

export class TokenPayloadDTO {
  _id: string;
  iat?: number;
  exp?: number;
}
