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
exports.RestaurantService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let RestaurantService = class RestaurantService {
    constructor(RestaurantModel) {
        this.RestaurantModel = RestaurantModel;
    }
    async findAll() {
        return await this.RestaurantModel.find().sort({ "CreatedOn": -1 });
    }
    async findOne(id) {
        return await this.RestaurantModel.findOne({ _id: id });
    }
    async getByRestaurantId(RestaurantId) {
        return await this.RestaurantModel.findOne({ RestaurantId: RestaurantId });
    }
    async register(restaurant) {
        let isExist = await this.RestaurantModel.findOne({
            Name: restaurant.Name,
            PhoneNumber: restaurant.PhoneNumber,
        });
        if (isExist) {
            return await { error: restaurant.Name + " " + "already exist.", };
        }
        else {
            const newUser = new this.RestaurantModel(restaurant);
            return await newUser.save();
        }
    }
    async updateRestaurant(id, restaurant) {
        let isExist = await this.RestaurantModel.findOne({
            _id: id,
        });
        if (isExist) {
            let result = await this.RestaurantModel.updateOne({
                _id: id,
            }, {
                $set: {
                    Name: restaurant.Name,
                    About: restaurant.About,
                    Address: restaurant.Address,
                    PhoneNumber: restaurant.PhoneNumber,
                    Image: restaurant.Image
                },
            }, {
                new: true,
            });
            return result;
        }
        else {
            return isExist;
        }
    }
};
RestaurantService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel("Restaurant")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], RestaurantService);
exports.RestaurantService = RestaurantService;
//# sourceMappingURL=restaurant.service.js.map