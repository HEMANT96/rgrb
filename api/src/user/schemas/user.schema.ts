//import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  PhoneNumber: string;

  @Prop()
  Password: string;

  @Prop()
  FirstName: string;

  @Prop()
  LastName: string;

  @Prop()
  Addresses: [];

  @Prop()
  Image: string;

  @Prop()
  Otp: Number;

  @Prop({ type: Date, default: Date.now  })
  CreatedOn: Date
}

export const UserSchema = SchemaFactory.createForClass(User);
 