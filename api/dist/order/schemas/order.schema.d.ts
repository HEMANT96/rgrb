import { Document } from 'mongoose';
export declare type OrderDocument = Order & Document;
export declare class Order {
    Price: string;
    Discount: string;
    Taxes: string;
    DeliveryCharge: string;
    FinalPrice: string;
    DeliveryStatus: string;
    PayStatus: string;
    DeliveryAddress: string;
    Image: string;
    UserId: {
        type: Document.Schema.Types.ObjectId;
        ref: 'UserSchema';
    };
    RestaurantId: {
        type: Document.Schema.Types.ObjectId;
        ref: 'RestaurantSchema';
    };
    CreatedOn: Date;
    Items: [
        {
            MenuId: {
                type: Document.Schema.Types.ObjectId;
                ref: 'MenuSchema';
            };
            Price: string;
            Quantity: number;
            Size: string;
            AddOns: [];
        }
    ];
    Tracks: [];
}
export declare const OrderSchema: any;
