import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IMongoDBEntity } from './entity.base';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export interface IUser extends IMongoDBEntity {
  username: string;
  email: string;
  password: string;
}

@Schema({ versionKey: false, timestamps: true })
export class User extends Document implements IUser {
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
}

export const UserSchema = SchemaFactory.createForClass(User);
