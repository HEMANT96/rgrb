"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RestaurantModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const restaurant_controller_1 = require("./restaurant.controller");
const restaurant_service_1 = require("./restaurant.service");
const restaurant_schema_1 = require("./schemas/restaurant.schema");
let RestaurantModule = RestaurantModule_1 = class RestaurantModule {
};
RestaurantModule = RestaurantModule_1 = __decorate([
    common_1.Module({
        imports: [RestaurantModule_1, mongoose_1.MongooseModule.forFeature([{ name: 'Restaurant', schema: restaurant_schema_1.RestaurantSchema }])],
        controllers: [restaurant_controller_1.RestaurantController],
        providers: [restaurant_service_1.RestaurantService],
    })
], RestaurantModule);
exports.RestaurantModule = RestaurantModule;
//# sourceMappingURL=restaurant.module.js.map