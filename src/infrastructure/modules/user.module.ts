import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Entity, PORT } from 'src/application';
import { GetUserProfileV1 } from 'src/application/use-cases/v1/user';
import { UserSchema } from 'src/domain';
import { UserRepository } from '../repositories';
import { UserControllerV1 } from '../controllers/v1/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Entity.User, schema: UserSchema }]),
  ],
  controllers: [UserControllerV1],
  providers: [
    GetUserProfileV1,
    {
      provide: PORT.User,
      useClass: UserRepository,
    },
  ],
  exports: [],
})
export class UserModule {}
