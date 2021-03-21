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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantSchema = exports.Restaurant = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Restaurant = class Restaurant {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Restaurant.prototype, "Name", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Restaurant.prototype, "About", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Restaurant.prototype, "Address", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Restaurant.prototype, "PhoneNumber", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Restaurant.prototype, "Image", void 0);
__decorate([
    mongoose_1.Prop({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Restaurant.prototype, "CreatedOn", void 0);
Restaurant = __decorate([
    mongoose_1.Schema()
], Restaurant);
exports.Restaurant = Restaurant;
exports.RestaurantSchema = mongoose_1.SchemaFactory.createForClass(Restaurant);
//# sourceMappingURL=restaurant.schema.js.map