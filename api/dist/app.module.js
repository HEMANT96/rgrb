"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const menus_module_1 = require("./menus/menus.module");
const restaurant_module_1 = require("./restaurant/restaurant.module");
const categories_module_1 = require("./categories/categories.module");
const order_module_1 = require("./order/order.module");
const promocode_module_1 = require("./promocode/promocode.module");
const mongoose_1 = require("@nestjs/mongoose");
const env_1 = require("./env");
const DB_URL = env_1.geyKeyValue('DB_URL');
console.log(DB_URL);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [menus_module_1.MenuModule, restaurant_module_1.RestaurantModule, user_module_1.UserModule, categories_module_1.CategoriesModule, order_module_1.OrderModule, promocode_module_1.PromocodeModule, mongoose_1.MongooseModule.forRoot(DB_URL)],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map