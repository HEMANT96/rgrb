//import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoriesDocument = Categories & Document ;

@Schema()
export class Categories {
  @Prop()
  Name: string;

  @Prop()
  About: string;

  @Prop()
  BackColor: string;

  @Prop()
  Image: string;

  @Prop()
  Icon: string;

  // @Prop()
  // Restaurant: string;

  // @Prop()
  // RestaurantId: number;

  @Prop({     type: Date,    default: Date.now  })
  CreatedOn: Date
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);

