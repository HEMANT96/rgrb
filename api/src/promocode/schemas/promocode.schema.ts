//import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PromocodeDocument = Promocode & Document;

@Schema()
export class Promocode {
  @Prop()
  Name: string;

  @Prop()
  Tagline: string;

  @Prop()
  Discount: string;

  @Prop()
  Image: string;
  
  @Prop({ type: Boolean, default: false })
  Percentage: boolean;

  @Prop({ type: Boolean, default: false })
  Absolute: boolean;

  @Prop({ type: Date, default: Date.now })
  CreatedOn: Date

}

export const PromocodeSchema = SchemaFactory.createForClass(Promocode);
