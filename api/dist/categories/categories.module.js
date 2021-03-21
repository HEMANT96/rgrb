"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CategoriesModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const categories_controller_1 = require("./categories.controller");
const categories_service_1 = require("./categories.service");
const categories_schema_1 = require("./schemas/categories.schema");
let CategoriesModule = CategoriesModule_1 = class CategoriesModule {
};
CategoriesModule = CategoriesModule_1 = __decorate([
    common_1.Module({
        imports: [CategoriesModule_1, mongoose_1.MongooseModule.forFeature([{ name: 'Categories', schema: categories_schema_1.CategoriesSchema }])],
        controllers: [categories_controller_1.CategoriesController],
        providers: [categories_service_1.CategoriesService],
    })
], CategoriesModule);
exports.CategoriesModule = CategoriesModule;
//# sourceMappingURL=categories.module.js.map