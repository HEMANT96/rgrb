import { User } from "./interfaces/user.interface";
import { Model } from "mongoose";
import { Admin } from "./interfaces/admin.interface";
export declare class UserService {
    private readonly UserModel;
    private readonly AdminModel;
    constructor(UserModel: Model<User>, AdminModel: Model<Admin>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    register(user: User): Promise<any>;
    adminAdd(admin: Admin): Promise<any>;
    adminLogin(admin: any): Promise<any>;
    login(user: any): Promise<any>;
    sendSMS(randomNumber: any, PhoneNumber: any): void;
    GenerateOTP(id: any, data: any): Promise<User>;
    verifyOtp(user: any): Promise<any>;
    updateProfile(id: any, user: any): Promise<User>;
    addAddress(id: any, address: any): Promise<User>;
    updateAddress(id: any, user: any): Promise<User>;
    updateNames(id: any, user: any): Promise<User>;
    updatePass(id: any, user: any): Promise<User>;
}
