import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  DefaultApiResponse,
  SignInPresentation,
  SignInV1,
  SignUpV1,
  SignupDTO,
} from 'src/application';
import { JwtAuthGuard, LocalAuthGuard } from 'src/infrastructure/config';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthControllerV1 {
  constructor(
    private readonly signupUseCase: SignUpV1,
    private readonly signInUseCase: SignInV1,
  ) {}

  @Post('sign-up')
  async signup(@Body() body: SignupDTO): Promise<DefaultApiResponse<any>> {
    await this.signupUseCase.exec(body);
    return { message: 'Signup successful', status: HttpStatus.CREATED };
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Request() req,
  ): Promise<DefaultApiResponse<SignInPresentation>> {
    const info: SignInPresentation = await this.signInUseCase.exec(req.user);

    return { message: 'User logged', info, status: HttpStatus.OK };
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async check(): Promise<DefaultApiResponse<any>> {
    return { message: 'User logged', status: HttpStatus.OK };
  }
}
