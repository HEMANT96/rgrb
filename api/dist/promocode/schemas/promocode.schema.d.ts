import { Document } from 'mongoose';
export declare type PromocodeDocument = Promocode & Document;
export declare class Promocode {
    Name: string;
    Tagline: string;
    Discount: string;
    Image: string;
    Percentage: boolean;
    Absolute: boolean;
    CreatedOn: Date;
}
export declare const PromocodeSchema: any;
