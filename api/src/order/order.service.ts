import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Order } from "./interfaces/order.interface";
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from "./dto/create-order.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class OrderService {
  constructor(@InjectModel("Order") private readonly OrderModel: Model<Order>) { }

  async updateStatus(id: string, status: string): Promise<Order> {
    console.log({ id, status })
    return this.OrderModel.findOneAndUpdate(
      { "_id": Types.ObjectId(id) },
      {
        $push: { Tracks: { Track: status.toString().toUpperCase(), Time: new Date() } },
        $set: { DeliveryStatus: status.toString().toUpperCase() }
      }
    )
  }

  async updateAddress(id: string, address: string): Promise<Order> {
    console.log({ id, address })
    return this.OrderModel.findOneAndUpdate(
      { "_id": Types.ObjectId(id) },
      {
        $set: { DeliveryAddress: address }
      }
    )
  }

  async updatePaymentStatus(id: string, status: string): Promise<Order> {
    return this.OrderModel.findOneAndUpdate(
      { "_id": Types.ObjectId(id) },
      {
        $set: { PayStatus: status }
      }
    )
  }


  async register(order: Order): Promise<Order> {
    order.RestaurantId = Types.ObjectId(order.RestaurantId);
    order.UserId = Types.ObjectId(order.UserId);
    for (let itm = 0; itm < (order.Items || []).length; itm++) {
      order.Items[itm].MenuId = Types.ObjectId(order.Items[itm].MenuId);
    }
    order.Tracks = [{ Track: 'NEW', Time: new Date() }];
    const newOrder = new this.OrderModel(order);
    return await newOrder.save();
  }

  async getOrderDetailsById(orderId): Promise<Order> {
    const pipeline = [
      { $match: { _id: Types.ObjectId(orderId) } },
      { $unwind: "$Items" },
      {
        $lookup: {
          from: "menus",
          localField: "Items.MenuId",
          foreignField: "_id",
          as: "Items.MenuId"
        }
      },
      { $unwind: "$Items.MenuId" },
      {
        $group:
        {
          _id: "$_id",
          Items: { $push: "$Items" },
        }
      }
    ];

    const orders = await this.OrderModel.aggregate(pipeline);
    return orders[0];
  }

  async getOrderByUserId(userId): Promise<Order[]> {
    const pipeline1 = [
      { $unwind: "$Items" },
      {
        $lookup: {
          from: "menus",
          localField: "Items.MenuId",
          foreignField: "_id",
          as: "Items.MenuId"
        }
      },
      { $unwind: "$Items.MenuId" },
      {
        $group:
        {
          _id: "$_id",
          Items: { $push: "$Items" },
          "DeliveryStatus": { $first: "$DeliveryStatus" },
          "Price": { $first: "$Price" },
          "Discount": { $first: "$Discount" },
          "Taxes": { $first: "$Taxes" },
          "DeliveryCharge": { $first: "$DeliveryCharge" },
          "DeliveryAddress": { $first: "$DeliveryAddress" },
          "FinalPrice": { $first: "$FinalPrice" },
          "Image": { $first: "$Image" },
          "RestaurantId": { $first: "$RestaurantId" },
          "CreatedOn": { $first: "$CreatedOn" },
          "UserId": { $first: "$UserId" },
          "Tracks": { $first: "$Tracks" },
        }
      }
    ];
    let pipeline: any = [];
    if (userId == "-1") {
      pipeline = [];
    } else {
      pipeline = [{ $match: { UserId: Types.ObjectId(userId) } }];
    }


    for (let p = 0; p < pipeline1.length; p++) {
      pipeline.push(pipeline1[p]);
    }

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
        from: 'users',
        localField: 'UserId',
        foreignField: '_id',
        as: 'UserId'
      }
    });

    pipeline.push({
      $unwind: '$UserId'
    });

    pipeline.push({
      $sort : { CreatedOn : -1 } 
    });

    return this.OrderModel.aggregate(pipeline);
  }

}
