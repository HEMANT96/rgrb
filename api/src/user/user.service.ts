import { Injectable } from "@nestjs/common";
import { User } from "./interfaces/user.interface";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "./interfaces/admin.interface";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly UserModel: Model<User>, 
  @InjectModel("Admin") private readonly AdminModel: Model<Admin>) { }

  async findAll(): Promise<User[]> {
    return await this.UserModel.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.UserModel.findOne({ _id: id });
  }

  async register(user: User): Promise<any> {
    let isExist = await this.UserModel.findOne({
      PhoneNumber: user.PhoneNumber,
    });
    if (isExist) {
      // return { isExist: true, msg: "User Exist" };
      isExist = false
      return isExist;
      // return await { error: "user exist with the same number" }
    } else {
      const newUser = new this.UserModel(user);
      return await newUser.save();
    }
  }

  async adminAdd(admin: Admin): Promise<any> {
    let isExist = await this.AdminModel.findOne({
     Email: admin.Email,
    });
    if (isExist) {
      // return { isExist: true, msg: "User Exist" };
      isExist = false
      return isExist;
      // return await { error: "user exist with the same number" }
    } else {
      const newAdmin = new this.AdminModel(admin);
      return await newAdmin.save();
    }
  }


  /* async register(user: any): Promise<User> {
   let query: any  = {};
   if(isNaN(user._id)) {
     query._id = user._id
   } 
   let isExist = await this.UserModel.findOne(query);
   if (isExist) {
     // console.log(mystr);
     let result = await this.UserModel.updateOne(
       {
         $set: {
           PhoneNumber: user.PhoneNumber,
           Password: user.Password
         },
       },
       {
         new: true,
       }
     );
     return result;
   } else {
     return isExist;
   }
 } */

  async adminLogin(admin: any) : Promise<any> {
    var query = { Password: admin.Password, Email: admin.Email }

    let isExist = await this.AdminModel.findOne(query);
    if (isExist) {
      //console.log(mystr);
      if (admin.Password == isExist.Password && admin.Email == isExist.Email) {
        return { isExist: true, user: isExist };
      } else {
        return { isExist: false, msg: "Wrong UserName && Password" };
      }
    } else {
      return { isExist: false, msg: "Wrong User Id" };
    }
  }

  async login(user: any): Promise<any> {

    var query = { Password: user.Password, PhoneNumber: user.PhoneNumber }

    let isExist = await this.UserModel.findOne(query);
    if (isExist) {
      //console.log(mystr);
      if (user.Password == isExist.Password && user.PhoneNumber == isExist.PhoneNumber) {
        return { isExist: true, user: isExist };
      } else {
        return { isExist: false, msg: "Wrong UserName && Password" };
      }
    } else {
      return { isExist: false, msg: "Wrong User Id" };
    }
  }

  sendSMS(randomNumber, PhoneNumber) {

    const accountSid = 'ACcf4efb1372b42f24b51fea296d534d7f'; 
    const authToken = '8eaf6b1225927e87a813a5d5f6cc5bcb';
    const client = require('twilio')(accountSid, authToken);
    const country_code = "+1";
    const to_send = country_code + PhoneNumber;

    client.messages
      .create({
        body: 'Your 4 digit code for regrub app is - ' + randomNumber,
        from: '+17744625692',
        to: to_send
      })
      .then(message => console.log(message.sid));
  }

  async GenerateOTP(id: any, data): Promise<User> {
    console.log(data);
    let isExist = await this.UserModel.findOne({
      PhoneNumber: data.PhoneNumber,
    });
    if (isExist) {
      let Otp = Math.floor(100000 + Math.random() * 900000);
      // console.log(mystr);
      let result = await this.UserModel.updateOne(
        {
          PhoneNumber: data.PhoneNumber,

        },
        {
          $set: {
            Otp: Otp,
            PhoneNumber: data.PhoneNumber,
          },
        },
        {
          new: true,
        }
      );
      this.sendSMS(Otp, data.PhoneNumber) ; 
      return result;
    } else {
      isExist = false
      return isExist;
    }
  }
  /* 
   async GenerateOTP(id:any, data:any, Otp) { 
 
     let isExist = await this.UserModel.findOne({
       _id: id,
     });
     if (isExist) {
       // console.log(mystr);
       let result = await this.UserModel.updateOne(
         {
           _id: id,
         },
         {
           $set: {
             Otp:Otp,
             PhoneNumber: data.PhoneNumber,
           },
         },
         {
           new: true,
         }
       );
       return result;
     } else {
       return isExist;
     }
   }  */
  async verifyOtp(user: any): Promise<any> {

    let query: any = {};
    if (isNaN(user._id)) {
      query._id = user._id
    }
    let isExist = await this.UserModel.findOne(query);
    if (isExist) {
      //console.log(mystr);
      if (user.Otp == isExist.Otp) {
        return { isExist: true, user: isExist };
      } else {
        return { isExist: false, msg: "Wrong otp" };
      }
    } else {
      return { isExist: false, msg: "Wrong otp " };
    }
  }


  async updateProfile(id: any, user: any): Promise<User> {
    let result = await this.UserModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          Image: user.ImagePath,
          FirstName: user.FirstName,
          LastName: user.LastName,
        },
      },
      {
        new: true,
      }
    );
    return this.findOne(id);

  }

  async addAddress(id: any, address: any): Promise<User> {
    let result = await this.UserModel.updateOne(
      {
        _id: id,
      },
      {
        $push: {
          Addresses: {
            Nick: address.Nick,
            Address: address.Address,
            IsDefault: address.IsDefault
          }
        }
      },
      {
        new: true,
      }
    );
    return this.findOne(id);
  }

  async updateAddress(id: any, user: any): Promise<User> {
    let isExist = await this.UserModel.findOne({
      _id: id,
    });
    if (isExist) {
      // console.log(mystr);
      let result = await this.UserModel.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            Address: user.Address,
          },
          $push: {
            Addresses: {
              Nick: 'Default',
              Address: user.Address,
              IsDefault: true
            }
          }
        },
        {
          new: true,
        }
      );
      return result;
    } else {
      return isExist;
    }
  }
  async updateNames(id: any, user: any): Promise<User> {
    let isExist = await this.UserModel.findOne({
      _id: id,
    });
    if (isExist) {
      // console.log(mystr);
      let result = await this.UserModel.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            FirstName: user.FirstName,
            LastName: user.LastName,
            Image: user.Image
          },
        },
        {
          new: true,
        }
      );
      return result;
    } else {
      return isExist;
    }
  }

  async updatePass(id: any, user: any): Promise<User> {
    let isExist = await this.UserModel.findOne({
      _id: id,
    });
    if (isExist) {
      // console.log(mystr);
      let result = await this.UserModel.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            Password: user.Password,
          },
        },
        {
          new: true,
        }
      );
      return result;
    } else {
      return isExist;
    }
  }

}
