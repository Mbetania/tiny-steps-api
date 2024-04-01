import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from 'src/domain/entities';
import { AuthControllerV1 } from '../controllers';
import { PORT, SignInV1, SignUpV1 } from 'src/application';
import { UserRepository } from '../repositories';
import { BcryptModule, JwtStrategy, LocalStrategy } from '../config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ session: true }),
    BcryptModule,
  ],
  controllers: [AuthControllerV1],
  providers: [
    SignUpV1,
    SignInV1,
    LocalStrategy,
    JwtStrategy,
    { provide: PORT.User, useClass: UserRepository },
  ],
  exports: [],
})
export class AuthModule {}
