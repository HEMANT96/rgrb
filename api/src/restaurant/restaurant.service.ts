import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Restaurant } from "./interfaces/restaurant.interface";
import { Model } from "mongoose";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class RestaurantService {
  constructor(@InjectModel("Restaurant") private readonly RestaurantModel: Model<Restaurant>) { }

  async findAll(): Promise<Restaurant[]> {
    return await this.RestaurantModel.find().sort({ "CreatedOn": -1 })
  }

  async findOne(id: string): Promise<Restaurant> {
    return await this.RestaurantModel.findOne({ _id: id });
  }

  async getByRestaurantId(RestaurantId: number): Promise<Restaurant> {
    return await this.RestaurantModel.findOne({ RestaurantId: RestaurantId });
  }

  async register(restaurant: Restaurant): Promise<any> {
    let isExist = await this.RestaurantModel.findOne({
      Name: restaurant.Name,
      PhoneNumber: restaurant.PhoneNumber,
    });
    if(isExist){
      return await { error: restaurant.Name + " " + "already exist." , }
    } else {
      const newUser = new this.RestaurantModel(restaurant);
      return await newUser.save();
    }
  }

  async updateRestaurant(id: any, restaurant: any): Promise<Restaurant> {
    let isExist = await this.RestaurantModel.findOne({
      _id: id,
    });
    if (isExist) {
      // console.log(mystr);
      let result = await this.RestaurantModel.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            Name: restaurant.Name,
            About: restaurant.About,
            Address: restaurant.Address,
            PhoneNumber: restaurant.PhoneNumber,
            Image: restaurant.Image
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
