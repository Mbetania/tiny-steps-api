import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class OnboardingProfileDTO {
  @ApiProperty({
    description: 'User name',
    example: 'sp33d3rs',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  sonsname: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsPositive()
  age: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ type: Date })
  @IsDate()
  @IsNotEmpty()
  birthyear: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsPositive()
  height: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsPositive()
  weight: number;
}
