import { ERole, EUserStatus } from 'src/domain';
import { DefaultApiResponse } from './common.presentations';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export interface IUserProfile {
  username: string;
  email: string;
  status: EUserStatus;
  profiles?: Types.ObjectId | [];
  role: ERole;
}

export class UserProfile extends DefaultApiResponse<any> {
  @ApiProperty({
    description: 'The data of the user',
  })
  user: IUserProfile;
}
