import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IMongoDBEntity } from '../entity.base';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
import { EUserStatus } from '../enums';

export interface IAuth extends IMongoDBEntity {
  email?: string;
  password?: string;
  username?: string;
  status?: EUserStatus;
}

@Schema({ versionKey: false, timestamps: true })
export class Auth extends Document implements IAuth {
  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  @Exclude()
  password: string;

  @Prop({
    type: String,
    enum: EUserStatus,
    default: EUserStatus.ACTIVE,
    required: true,
  })
  status: EUserStatus;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
