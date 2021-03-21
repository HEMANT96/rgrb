import { HttpException,HttpStatus, Injectable } from "@nestjs/common";
import { Categories } from "./interfaces/categories.interface";
import { Model } from "mongoose";
import { CreateCategoriesDto } from "./dto/create-categories.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CategoriesService {
  constructor(@InjectModel("Categories") private readonly CategoriesModel: Model<Categories>) {}

  async findAll(): Promise<Categories[]> {
    return await this.CategoriesModel.find().sort({ "CreatedOn": -1 });
  }

  async findOne(id: string): Promise<Categories> {
    return await this.CategoriesModel.findOne({ _id: id });
  }

 /*  async getByCategoriesById(CategoriesId: number): Promise<Categories> {
    return await this.CategoriesModel.findOne({CategoriesId: CategoriesId });
  } */

   async register(categories: Categories): Promise<any> {
     
    let isExist = await this.CategoriesModel.findOne({
      Name: categories.Name,
    });
    if(isExist){
      return await { error: categories.Name + " " + "already exist." , }
    } else {
      const newCategories = new this.CategoriesModel(categories);
      return await newCategories.save();
    }
 }

   async updateCategories(id: any, categories: any): Promise<Categories> {
     let isExist = await this.CategoriesModel.findOne({
      _id: id,
      });
     if (isExist) {
    // console.log(mystr);
      let result = await this.CategoriesModel.updateOne(
        {
        _id: id,
      },
      {
        $set: {
          Name: categories.Name,
          About: categories.About,
          BackColor: categories.BackColor,
          Image: categories.Image,
          Icon: categories.Icon,
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
