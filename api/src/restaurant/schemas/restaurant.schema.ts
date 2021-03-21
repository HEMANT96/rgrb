//import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestaurantDocument = Restaurant & Document ;

@Schema()
export class Restaurant {
  @Prop()
  Name: string;

  @Prop()
  About: string;

  @Prop()
  Address: string;

  @Prop()
  PhoneNumber: string;
  
  @Prop()
  Image: string;

  @Prop({     type: Date,    default: Date.now  })
  CreatedOn: Date

}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
 