import { Inject, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { SignupDTO } from 'src/application/dtos';
import { PORT } from 'src/application/enums';
import { UserAlreadyExists } from 'src/application/exceptions';
import { IUserProfile } from 'src/application/presentations';
import { ERole, EUserStatus, IProfile, IUser } from 'src/domain';
import { IProfileRepository, IUserRepository } from 'src/infrastructure';
import { BcryptService } from 'src/infrastructure/config/bcrypt/bcrypt.service';

export class SignUpV1 {
  private readonly logger = new Logger(SignUpV1.name);

  constructor(
    @Inject(PORT.User) private readonly userRepository: IUserRepository,
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
    let profiles: IUser = { profiles: [] };
    profiles = await this.userRepository.create(profiles);
    const userData: IUser = {
      ...data,
      email: data.email,
      password: cryptedPassword,
      status: EUserStatus.ACTIVE,
      profiles: new Types.ObjectId(profiles._id),
      role: ERole.NOT_ASSIGNED,
    };

    const user = await this.userRepository.create(userData);

    return user._id;
  }
}
