import { Document } from 'mongoose';
export declare type RestaurantDocument = Restaurant & Document;
export declare class Restaurant {
    Name: string;
    About: string;
    Address: string;
    PhoneNumber: string;
    Image: string;
    CreatedOn: Date;
}
export declare const RestaurantSchema: any;
