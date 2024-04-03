import { IProfile, Profile } from 'src/domain';
import { IRepository, Repository } from './repository';
import { InjectModel } from '@nestjs/mongoose';
import { Entity } from 'src/application';
import { Model } from 'mongoose';

export interface IProfileRepository extends IRepository<IProfile> {}
export class profileRepository extends Repository<Profile> {
  constructor(
    @InjectModel(Entity.Profile) private readonly profileModel: Model<Profile>,
  ) {
    super(profileModel);
  }
}
