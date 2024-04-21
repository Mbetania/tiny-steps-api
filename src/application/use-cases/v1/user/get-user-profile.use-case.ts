import { Inject, Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { PORT } from 'src/application/enums';
import { UserNotFound } from 'src/application/exceptions';
import { IUserProfile } from 'src/application/presentations/user.presentations';
import { UserRepository } from 'src/infrastructure';

@Injectable()
export class GetUserProfileV1 {
  private readonly logger = new Logger(GetUserProfileV1.name);
  constructor(
    @Inject(PORT.User) private readonly userRepository: UserRepository,
  ) {}

  async exec(userID: string): Promise<IUserProfile> {
    const user = await this.userRepository.findOne({
      query: { _id: new Types.ObjectId(userID) },
    });

    const userProfile: IUserProfile = {
      username: user.username,
      profiles: user.profiles,
      role: user.role,
      email: user.email,
    };
    return userProfile;
  }
}
