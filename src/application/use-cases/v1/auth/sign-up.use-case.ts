import { Inject, Logger } from '@nestjs/common';
import { SignupDTO } from 'src/application/dtos';
import { PORT } from 'src/application/enums';
import { UserAlreadyExists } from 'src/application/exceptions';
import { ERole, EUserStatus, IAuth } from 'src/domain';
import { IUserRepository } from 'src/infrastructure';
import { BcryptService } from 'src/infrastructure/config/bcrypt/bcrypt.service';

export class SignUpV1 {
  private readonly logger = new Logger(SignUpV1.name);

  constructor(
    @Inject(PORT.Auth) private readonly AuthRepository: IUserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async exec(data: SignupDTO): Promise<string> {
    const duplicate = await this.userRepository.findOne({
      query: { email: data.email },
    });

    if (Boolean(duplicate)) throw new UserAlreadyExists();
    const cryptedPassword = await this.bcryptService.encriptPassword(
      data.password,
    );

    const userData: IAuth = {
      ...data,
      email: data.email,
      password: cryptedPassword,
      status: EUserStatus.ACTIVE,
    };

    const user = await this.userRepository.create(userData);

    return user._id;
  }
}
