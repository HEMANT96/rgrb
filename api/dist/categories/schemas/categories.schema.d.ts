import { Document } from 'mongoose';
export declare type CategoriesDocument = Categories & Document;
export declare class Categories {
    Name: string;
    About: string;
    BackColor: string;
    Image: string;
    Icon: string;
    CreatedOn: Date;
}
export declare const CategoriesSchema: any;
