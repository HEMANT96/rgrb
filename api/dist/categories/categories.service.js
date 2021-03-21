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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let CategoriesService = class CategoriesService {
    constructor(CategoriesModel) {
        this.CategoriesModel = CategoriesModel;
    }
    async findAll() {
        return await this.CategoriesModel.find().sort({ "CreatedOn": -1 });
    }
    async findOne(id) {
        return await this.CategoriesModel.findOne({ _id: id });
    }
    async register(categories) {
        let isExist = await this.CategoriesModel.findOne({
            Name: categories.Name,
        });
        if (isExist) {
            return await { error: categories.Name + " " + "already exist.", };
        }
        else {
            const newCategories = new this.CategoriesModel(categories);
            return await newCategories.save();
        }
    }
    async updateCategories(id, categories) {
        let isExist = await this.CategoriesModel.findOne({
            _id: id,
        });
        if (isExist) {
            let result = await this.CategoriesModel.updateOne({
                _id: id,
            }, {
                $set: {
                    Name: categories.Name,
                    About: categories.About,
                    BackColor: categories.BackColor,
                    Image: categories.Image,
                    Icon: categories.Icon,
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
CategoriesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel("Categories")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map