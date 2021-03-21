"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PromocodeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromocodeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const promocode_controller_1 = require("./promocode.controller");
const promocode_service_1 = require("./promocode.service");
const promocode_schema_1 = require("./schemas/promocode.schema");
let PromocodeModule = PromocodeModule_1 = class PromocodeModule {
};
PromocodeModule = PromocodeModule_1 = __decorate([
    common_1.Module({
        imports: [PromocodeModule_1, mongoose_1.MongooseModule.forFeature([{ name: 'Promocode', schema: promocode_schema_1.PromocodeSchema }])],
        controllers: [promocode_controller_1.PromocodeController],
        providers: [promocode_service_1.PromocodeService],
    })
], PromocodeModule);
exports.PromocodeModule = PromocodeModule;
//# sourceMappingURL=promocode.module.js.map