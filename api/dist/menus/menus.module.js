"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MenuModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const menus_controller_1 = require("./menus.controller");
const menus_service_1 = require("./menus.service");
const menu_schema_1 = require("./schemas/menu.schema");
let MenuModule = MenuModule_1 = class MenuModule {
};
MenuModule = MenuModule_1 = __decorate([
    common_1.Module({
        imports: [MenuModule_1, mongoose_1.MongooseModule.forFeature([{ name: 'Menu', schema: menu_schema_1.MenuSchema }])],
        controllers: [menus_controller_1.MenuController],
        providers: [menus_service_1.MenuService]
    })
], MenuModule);
exports.MenuModule = MenuModule;
//# sourceMappingURL=menus.module.js.map