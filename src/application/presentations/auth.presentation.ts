import { EUserStatus } from 'src/domain';

export class SignInPresentation {
  token: string;
  status: EUserStatus;
}
