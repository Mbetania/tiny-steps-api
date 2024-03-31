import { HttpStatus } from '@nestjs/common';
import { GenericHttpException } from '../commons';

export class UserAlreadyExists extends GenericHttpException {
  constructor() {
    super(
      'Another user is already registered with the same email address.',
      HttpStatus.UNAUTHORIZED,
      'USER_ALREADY_EXISTS',
    );
  }
}
