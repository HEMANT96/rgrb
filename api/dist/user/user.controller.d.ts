import { CreateUserDto } from "./dto/create-user.dto";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { User } from "./interfaces/user.interface";
import { UserService } from "./user.service";
import { Admin } from "./schemas/admin.schema";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOne(id: any): Promise<User>;
    register(createUserDto: CreateUserDto): Promise<User>;
    adminAdd(createAdminDto: CreateAdminDto): Promise<Admin>;
    login(user: any): Promise<User>;
    adminLogin(user: any): Promise<User>;
    generateotp(id: string, data: any): Promise<any>;
    updatePass(id: string, user: any): Promise<User>;
    verifyOtp(user: any): Promise<User>;
    updateProfile(id: string, user: any): Promise<User>;
    updateAdd(id: string, user: any): Promise<User>;
    postAddress(id: string, address: any): Promise<User>;
    updateNames(id: string, user: any): Promise<User>;
}
