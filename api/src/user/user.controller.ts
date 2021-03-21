import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { User } from "./interfaces/user.interface";
import { UserService } from "./user.service";
import { Admin } from "./schemas/admin.schema";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get(":id")
  async findOne(@Param("id") id): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.register(createUserDto);
  }
  @Post('/adminAdd')
  async adminAdd(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.userService.adminAdd(createAdminDto);
  }


  @Post('login')
  login(@Body() user: any): Promise<User> {
    return this.userService.login(user);
  }

  @Post('admin-login')
  adminLogin(@Body() user: any): Promise<User> {
    return this.userService.adminLogin(user);
  }

  @Post("gnerate-otp/:id")
  generateotp(@Param("id") id: string, @Body() data: any): Promise<any> {
    return this.userService.GenerateOTP(id, data);
  }




  @Put("password/:id")
  async updatePass(@Param("id") id: string, @Body() user: any): Promise<User> {
    return this.userService.updatePass(id, user);
  }

  @Post('verify-otp')
  verifyOtp(@Body() user: any): Promise<User> {
    return this.userService.verifyOtp(user);
  }

  @Put("update-profile/:id")
  async updateProfile(
    @Param("id") id: string,
    @Body() user: any
  ): Promise<User> {
    var base64Data = user.base64Data;
    base64Data = base64Data.replace(/^data:image\/[a-z]+;base64,/, "");
    var buf = new Buffer(base64Data, 'base64');
    var fs = require("fs")
    var ImagePath = 'profiles/' + user.PhoneNumber + ".png";
    var fileName = '/Images/' + ImagePath;

    var appRoot = require('app-root-path');
    var finalname = appRoot + fileName;

    fs.writeFile(finalname, buf, function (err) {
      console.log("file saved message");
      console.log(err);
    });
    console.log(ImagePath);
    return this.userService.updateProfile(id, user);
  }

  @Put("address/:id")
  async updateAdd(@Param("id") id: string, @Body() user: any): Promise<User> {
    return this.userService.updateAddress(id, user);
  }

  @Post('/add-address/:id')
  async postAddress(@Param("id") id: string, @Body() address: any): Promise<User> {
    return this.userService.addAddress(id, address);
  }

  @Put("profile/:id")
  async updateNames(@Param("id") id: string, @Body() user: any): Promise<User> {
    return this.userService.updateNames(id, user);
  }
}


