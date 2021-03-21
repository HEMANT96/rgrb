//import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type OrderDocument = Order & Document;


@Schema()
export class Order {

  @Prop()
  Price: string;

  @Prop()
  Discount: string;

  @Prop()
  Taxes: string;

  @Prop()
  DeliveryCharge: string;

  @Prop()
  FinalPrice: string;

  @Prop({ type: String, default: 'NEW' })
  DeliveryStatus: string;

  @Prop({ type: String, default: 'NEW' })
  PayStatus: string;

  @Prop()
  DeliveryAddress: string

  @Prop()
  Image: string;

  @Prop()
  UserId: {
    type: Document.Schema.Types.ObjectId, ref: 'UserSchema'
  };

  @Prop()
  RestaurantId: {
    type: Document.Schema.Types.ObjectId, ref: 'RestaurantSchema'
  }

  @Prop({ type: Date, default: Date.now })
  CreatedOn: Date;

  @Prop()
  Items: [{
    MenuId: {
      type: Document.Schema.Types.ObjectId, ref: 'MenuSchema'
    },
    Price: string;
    Quantity: number,
    Size: string;
    AddOns: []
  }]

  @Prop()
  Tracks: [] // NEW , CONFIRMED, PREPARED, SHIPPED , DELIVERED 

}

export const OrderSchema = SchemaFactory.createForClass(Order);
