import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    PhoneNumber: string;
    Password: string;
    FirstName: string;
    LastName: string;
    Addresses: [];
    Image: string;
    Otp: Number;
    CreatedOn: Date;
}
export declare const UserSchema: any;
