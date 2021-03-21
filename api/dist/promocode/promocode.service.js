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
exports.PromocodeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let PromocodeService = class PromocodeService {
    constructor(PromocodeModel) {
        this.PromocodeModel = PromocodeModel;
    }
    async findAll() {
        return await this.PromocodeModel.find().sort({ "CreatedOn": -1 });
    }
    async findOne(id) {
        return await this.PromocodeModel.findOne({ _id: id });
    }
    async getByPromocodeId(PromocodeId) {
        return await this.PromocodeModel.findOne({ PromocodeId: PromocodeId });
    }
    async register(promocode) {
        let isExist = await this.PromocodeModel.findOne({
            Name: promocode.Name,
        });
        if (isExist) {
            return await { error: "Promocode exist with the same name", };
        }
        else {
            const newPromo = new this.PromocodeModel(promocode);
            return await newPromo.save();
        }
    }
    async updatePromocode(id, promocode) {
        let isExist = await this.PromocodeModel.findOne({
            _id: id,
        });
        if (isExist) {
            let result = await this.PromocodeModel.updateOne({
                _id: id,
            }, {
                $set: {
                    Name: promocode.Name,
                    Tagline: promocode.Tagline,
                    Discount: promocode.Discount,
                    Image: promocode.Image,
                    Percentage: promocode.Percentage,
                    Absolute: promocode.Absolute,
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
PromocodeService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel("Promocode")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], PromocodeService);
exports.PromocodeService = PromocodeService;
//# sourceMappingURL=promocode.service.js.map