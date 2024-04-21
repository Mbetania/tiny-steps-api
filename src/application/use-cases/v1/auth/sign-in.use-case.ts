import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUser } from 'src/domain/entities';
import { SignInDTO, TokenPayloadDTO } from 'src/application/dtos';
import { InvalidCredentials, UserNotFound } from 'src/application/exceptions';
import { IUserRepository } from 'src/infrastructure';
import { BcryptService } from 'src/infrastructure/config/bcrypt/bcrypt.service';
import { PORT } from 'src/application/enums';

@Injectable()
export class SignInV1 {
  private readonly logger = new Logger(SignInV1.name);

  constructor(
    @Inject(PORT.User) private readonly userRepository: IUserRepository,
    @Inject(BcryptService) private readonly bcryptService: BcryptService,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}

  async exec(user: IUser): Promise<any> {
    const payload: TokenPayloadDTO = {
      _id: user._id,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(data: SignInDTO): Promise<any> {
    const { email, password } = data;
    const user: IUser = await this.userRepository.findOne({
      query: { email: email.toLowerCase() },
    });

    if (!user) throw new UserNotFound();

    const matchPassword = await this.bcryptService.comparePasswords(
      password,
      user.password,
    );

    if (!matchPassword) throw new InvalidCredentials();

    return user;
  }
}
