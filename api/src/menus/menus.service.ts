import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Menu } from "./interfaces/menu.interface";
import { Model, Types } from 'mongoose';
import { CreateMenuDto } from "./dto/create-menu.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class MenuService {
  constructor(@InjectModel("Menu") private readonly MenuModel: Model<Menu>) { }

  async findAll(query): Promise<Menu[]> {
    const dbQuery: any = {};
    if ('special' in query) {
      dbQuery.IsSpecial = true;
    }
    if ('dealofday' in query) {
      dbQuery.IsDealOfTheDay = true;
    }
    if ('restaurant' in query) {
      dbQuery.RestaurantId = Types.ObjectId(query.restaurant);
    }
    if ('categories' in query) {
      const catList1 = query.categories.split(',');
      const catList = [];
      for (let i = 0; i < catList1.length; i++) {
        catList.push(Types.ObjectId(catList1[i]));
      } //.map((c) => Types.ObjectId(c));
      dbQuery.CategoryId = { $in: catList }
    }
    const pipeline: any = [
      { $match: dbQuery }
    ];
    pipeline.push({
      $lookup: {
        from: 'restaurants',
        localField: 'RestaurantId',
        foreignField: '_id',
        as: 'RestaurantId'
      }
    });
    pipeline.push({
      $unwind: '$RestaurantId'
    }),

    pipeline.push({
      $lookup: {
        from: 'categories',
        localField: 'CategoryId',
        foreignField: '_id',
        as: 'CategoryId'
      }
    });

    pipeline.push({
      $unwind: '$CategoryId'
    });

    return await this.MenuModel.aggregate(pipeline); //.sort({ "CreatedOn": -1 });
  }

  async findOne(id: string): Promise<Menu> {
    const pipeline: any = [{
      $match : {_id:  Types.ObjectId(id) }
    }];
    pipeline.push({
      $lookup: {
        from: 'restaurants',
        localField: 'RestaurantId',
        foreignField: '_id',
        as: 'RestaurantId'
      }
    });
    pipeline.push({
      $unwind: '$RestaurantId'
    }),

    pipeline.push({
      $lookup: {
        from: 'categories',
        localField: 'CategoryId',
        foreignField: '_id',
        as: 'CategoryId'
      }
    });

    pipeline.push({
      $unwind: '$CategoryId'
    });
    return (await this.MenuModel.aggregate(pipeline))[0];
  }

  async updateMenuStatus(id: string, status: string): Promise<Menu> {
    return this.MenuModel.findOneAndUpdate(
      { "_id": Types.ObjectId(id) },
      {
        $set: { ActiveMenu: status }
      }
     )
    }

  async register(menu: Menu): Promise<any> {
    menu.RestaurantId = Types.ObjectId(menu.RestaurantId);
    menu.CategoryId = Types.ObjectId(menu.CategoryId);
    let isExist = await this.MenuModel.findOne({
      Name : menu.Name,
    });
    if(isExist){
      return await { error: menu.Name + " " + "already exist." , }
    } else {
      const newMenu = new this.MenuModel(menu);
      return await newMenu.save();
    }
  }


  async updateMenu(id: any, menu: any): Promise<Menu> {
    let isExist = await this.MenuModel.findOne({
      _id: id,
    });
    if (isExist) {
      // console.log(mystr);
      let result = await this.MenuModel.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            Name: menu.Name,
            About: menu.About,
            Price: menu.Price,
            Discount: menu.Discount,
            Available: menu.Available,
            PhoneNumber: menu.PhoneNumber,
            Image: menu.Image,
            RestaurantId: Types.ObjectId(menu.RestaurantId),
            CategoryId: Types.ObjectId(menu.CategoryId),
            IsSpecial: menu.IsSpecial,
            IsDealOfTheDay: menu.IsDealOfTheDay,
            Toppings: menu.Toppings,
            Counts: menu.Counts,
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
