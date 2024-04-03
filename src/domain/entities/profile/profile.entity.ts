import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface IProfile {
  _id?: string;
  sonsname: string;
  age: number;
  gender: string;
  birthyear: number;
  height: number;
  weight: number;
}

@Schema({ versionKey: false, timestamps: true })
export class Profile extends Document {
  @Prop({
    type: String,
  })
  sonsname: string;

  @Prop({
    type: Number,
  })
  age: number;

  @Prop({
    type: String,
  })
  gender: string;

  @Prop({
    type: Number,
  })
  birthyear: number;

  @Prop({
    type: Number,
  })
  height: number;

  @Prop({
    type: Number,
  })
  width: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
