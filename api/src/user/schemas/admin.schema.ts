//import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @Prop()
  Email: string;

  @Prop()
  Password: string;

  @Prop({ type: Date, default: Date.now  })
  CreatedOn: Date
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
 