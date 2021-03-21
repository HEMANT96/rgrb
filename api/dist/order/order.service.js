"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let OrderService = class OrderService {
    constructor(OrderModel) {
        this.OrderModel = OrderModel;
    }
    async updateStatus(id, status) {
        console.log({ id, status });
        return this.OrderModel.findOneAndUpdate({ "_id": mongoose_1.Types.ObjectId(id) }, {
            $push: { Tracks: { Track: status.toString().toUpperCase(), Time: new Date() } },
            $set: { DeliveryStatus: status.toString().toUpperCase() }
        });
    }
    async updateAddress(id, address) {
        console.log({ id, address });
        return this.OrderModel.findOneAndUpdate({ "_id": mongoose_1.Types.ObjectId(id) }, {
            $set: { DeliveryAddress: address }
        });
    }
    async updatePaymentStatus(id, status) {
        return this.OrderModel.findOneAndUpdate({ "_id": mongoose_1.Types.ObjectId(id) }, {
            $set: { PayStatus: status }
        });
    }
    async register(order) {
        order.RestaurantId = mongoose_1.Types.ObjectId(order.RestaurantId);
        order.UserId = mongoose_1.Types.ObjectId(order.UserId);
        for (let itm = 0; itm < (order.Items || []).length; itm++) {
            order.Items[itm].MenuId = mongoose_1.Types.ObjectId(order.Items[itm].MenuId);
        }
        order.Tracks = [{ Track: 'NEW', Time: new Date() }];
        const newOrder = new this.OrderModel(order);
        return await newOrder.save();
    }
    async getOrderDetailsById(orderId) {
        const pipeline = [
            { $match: { _id: mongoose_1.Types.ObjectId(orderId) } },
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
                $group: {
                    _id: "$_id",
                    Items: { $push: "$Items" },
                }
            }
        ];
        const orders = await this.OrderModel.aggregate(pipeline);
        return orders[0];
    }
    async getOrderByUserId(userId) {
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
                $group: {
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
        let pipeline = [];
        if (userId == "-1") {
            pipeline = [];
        }
        else {
            pipeline = [{ $match: { UserId: mongoose_1.Types.ObjectId(userId) } }];
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
            $sort: { CreatedOn: -1 }
        });
        return this.OrderModel.aggregate(pipeline);
    }
};
OrderService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel("Order")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map