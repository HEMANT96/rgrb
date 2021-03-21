//import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RestaurantSchema } from '../../restaurant/schemas/restaurant.schema'
export type MenuDocument = Menu & Document;


@Schema()
export class Menu {
  @Prop()
  Name: string;

  @Prop()
  About: string;

  @Prop()
  Price: string;

  @Prop()
  Discount: string;

  @Prop({ type: String, default: 'yes' })
  ActiveMenu: string;

  @Prop()
  Available: string;

  @Prop()
  Image: string;

  @Prop()
  Counts: { type: Number, default: 0};

  @Prop()
  CategoryId: {
    type: Document.Schema.Types.ObjectId, ref: 'CategorySchema'
  };

  @Prop()
  RestaurantId: {
    type: Document.Schema.Types.ObjectId, ref: 'RestaurantSchema'
  }

  @Prop({ type: Date, default: Date.now  })
   CreatedOn: Date;

  @Prop({     type: Boolean,    default: false  })
  IsSpecial: boolean;

  @Prop({     type: Boolean,    default: false  })
  IsDealOfTheDay: boolean;

  @Prop()
  Toppings: [];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
