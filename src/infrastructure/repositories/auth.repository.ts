import { Auth, IAuth } from 'src/domain';
import { IRepository, Repository } from './repository';
import { InjectModel } from '@nestjs/mongoose';
import { Entity } from 'src/application';
import { Model } from 'mongoose';

export interface IAuthRepository extends IRepository<IAuth> {}

export class UserRepository extends Repository<Auth> {
  constructor(
    @InjectModel(Entity.Auth) private readonly authModel: Model<Auth>,
  ) {
    super(authModel);
  }
}
