import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IMongoDBEntity } from '../entity.base';
import { Exclude } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { ERole } from '../enums';
import { Entity } from 'src/application';

export interface IUser extends IMongoDBEntity {
  username: string;
  profiles?: Types.ObjectId | [];
  role?: ERole;
}

@Schema({ versionKey: false, timestamps: true })
export class User extends Document implements IUser {
  @Prop({
    type: String,
    required: true,
  })
  username: string;

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
