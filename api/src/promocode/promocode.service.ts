import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Promocode } from "./interfaces/promocode.interface";
import { Model } from "mongoose";
import { CreatePromocodeDto } from "./dto/create-promocode.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class PromocodeService {
  constructor(@InjectModel("Promocode") private readonly PromocodeModel: Model<Promocode>) { }

  async findAll(): Promise<Promocode[]> {
    return await this.PromocodeModel.find().sort({ "CreatedOn": -1 })
  }

  async findOne(id: string): Promise<Promocode> {
    return await this.PromocodeModel.findOne({ _id: id });
  }

  async getByPromocodeId(PromocodeId: number): Promise<Promocode> {
    return await this.PromocodeModel.findOne({ PromocodeId: PromocodeId });
  }

  async register(promocode: Promocode): Promise<any> {
    let isExist = await this.PromocodeModel.findOne({
      Name: promocode.Name,
      // PhoneNumber: promocode.PhoneNumber,
    });
    if (isExist) {
      return await { error: "Promocode exist with the same name", }
    } else {
      const newPromo = new this.PromocodeModel(promocode);
      return await newPromo.save();
    }
  }

  async updatePromocode(id: any, promocode: any): Promise<Promocode> {
    let isExist = await this.PromocodeModel.findOne({
      _id: id,
    });
    if (isExist) {
      // console.log(mystr);
      let result = await this.PromocodeModel.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            Name: promocode.Name,
            Tagline: promocode.Tagline,
            Discount: promocode.Discount,
            Image: promocode.Image,
            Percentage: promocode.Percentage,
            Absolute: promocode.Absolute,
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
