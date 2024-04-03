import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { DefaultApiResponse, UserProfile } from 'src/application';
import { GetUserProfileV1 } from 'src/application/use-cases/v1/user';
import { JwtAuthGuard } from 'src/infrastructure/config';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('User')
@UseGuards(ThrottlerGuard)
@UseGuards(JwtAuthGuard)
export class UserControllerV1 {
  private readonly logger = new Logger(UserControllerV1.name);

  constructor(private readonly getUserProfileUseCase: GetUserProfileV1) {}

  @Get('/me')
  @HttpCode(HttpStatus.FOUND)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Ok request',
    type: DefaultApiResponse,
  })
  async getProfile(@Request() req): Promise<UserProfile> {
    const userId = req.user._id;

    const user = await this.getUserProfileUseCase.exec(userId);

    return { message: 'User found', user, status: HttpStatus.FOUND };
  }

  @Put('/onboarding')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async onboarding(
    @Request() req,
    @Body() body: OnboardingDTO,
  ): Promise<DefaultApiResponse> {
    const userId = req.user?._doc?._id;
    await this.onboardingUseCase.exec(body, userId);

    return { message: 'Onboarding made', status: HttpStatus.OK };
  }
}
