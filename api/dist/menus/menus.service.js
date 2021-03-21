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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let MenuService = class MenuService {
    constructor(MenuModel) {
        this.MenuModel = MenuModel;
    }
    async findAll(query) {
        const dbQuery = {};
        if ('special' in query) {
            dbQuery.IsSpecial = true;
        }
        if ('dealofday' in query) {
            dbQuery.IsDealOfTheDay = true;
        }
        if ('restaurant' in query) {
            dbQuery.RestaurantId = mongoose_1.Types.ObjectId(query.restaurant);
        }
        if ('categories' in query) {
            const catList1 = query.categories.split(',');
            const catList = [];
            for (let i = 0; i < catList1.length; i++) {
                catList.push(mongoose_1.Types.ObjectId(catList1[i]));
            }
            dbQuery.CategoryId = { $in: catList };
        }
        const pipeline = [
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
        return await this.MenuModel.aggregate(pipeline);
    }
    async findOne(id) {
        const pipeline = [{
                $match: { _id: mongoose_1.Types.ObjectId(id) }
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
    async updateMenuStatus(id, status) {
        return this.MenuModel.findOneAndUpdate({ "_id": mongoose_1.Types.ObjectId(id) }, {
            $set: { ActiveMenu: status }
        });
    }
    async register(menu) {
        menu.RestaurantId = mongoose_1.Types.ObjectId(menu.RestaurantId);
        menu.CategoryId = mongoose_1.Types.ObjectId(menu.CategoryId);
        let isExist = await this.MenuModel.findOne({
            Name: menu.Name,
        });
        if (isExist) {
            return await { error: menu.Name + " " + "already exist.", };
        }
        else {
            const newMenu = new this.MenuModel(menu);
            return await newMenu.save();
        }
    }
    async updateMenu(id, menu) {
        let isExist = await this.MenuModel.findOne({
            _id: id,
        });
        if (isExist) {
            let result = await this.MenuModel.updateOne({
                _id: id,
            }, {
                $set: {
                    Name: menu.Name,
                    About: menu.About,
                    Price: menu.Price,
                    Discount: menu.Discount,
                    Available: menu.Available,
                    PhoneNumber: menu.PhoneNumber,
                    Image: menu.Image,
                    RestaurantId: mongoose_1.Types.ObjectId(menu.RestaurantId),
                    CategoryId: mongoose_1.Types.ObjectId(menu.CategoryId),
                    IsSpecial: menu.IsSpecial,
                    IsDealOfTheDay: menu.IsDealOfTheDay,
                    Toppings: menu.Toppings,
                    Counts: menu.Counts,
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
MenuService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel("Menu")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], MenuService);
exports.MenuService = MenuService;
//# sourceMappingURL=menus.service.js.map