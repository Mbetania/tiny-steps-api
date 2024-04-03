import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IMongoDBEntity } from '../entity.base';
import { Exclude } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Entity } from 'src/application';

export interface IUser extends IMongoDBEntity {
  email?: string;
  password?: string;
  username?: string;
  status?: EUserStatus;
  profiles?: Types.ObjectId | [];
  role?: ERole;
}

export enum ERole {
  MOTHER = 'mother',
  FATHER = 'father',
  TUTOR = 'tutor',
  NOT_ASSIGNED = 'not assigned',
}
export enum EUserStatus {
  ACTIVE = 'active',
  DELETED = 'deleted',
  BLOCKED = 'blocked',
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

  @Prop({
    type: String,
    enum: EUserStatus,
    default: EUserStatus.ACTIVE,
    required: true,
  })
  status: EUserStatus;

  @Prop({ type: [{ type: Types.ObjectId, ref: Entity.Profile }], default: [] })
  profiles: Types.ObjectId | [];

  @Prop({
    type: String,
    enum: ERole,
    default: ERole.NOT_ASSIGNED,
  })
  role: ERole;
}

export const UserSchema = SchemaFactory.createForClass(User);
