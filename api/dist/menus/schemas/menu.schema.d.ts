import { Document } from 'mongoose';
export declare type MenuDocument = Menu & Document;
export declare class Menu {
    Name: string;
    About: string;
    Price: string;
    Discount: string;
    ActiveMenu: string;
    Available: string;
    Image: string;
    Counts: {
        type: Number;
        default: 0;
    };
    CategoryId: {
        type: Document.Schema.Types.ObjectId;
        ref: 'CategorySchema';
    };
    RestaurantId: {
        type: Document.Schema.Types.ObjectId;
        ref: 'RestaurantSchema';
    };
    CreatedOn: Date;
    IsSpecial: boolean;
    IsDealOfTheDay: boolean;
    Toppings: [];
}
export declare const MenuSchema: any;
