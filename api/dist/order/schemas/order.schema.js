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
exports.OrderSchema = exports.Order = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Order = class Order {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Order.prototype, "Price", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Order.prototype, "Discount", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Order.prototype, "Taxes", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Order.prototype, "DeliveryCharge", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Order.prototype, "FinalPrice", void 0);
__decorate([
    mongoose_1.Prop({ type: String, default: 'NEW' }),
    __metadata("design:type", String)
], Order.prototype, "DeliveryStatus", void 0);
__decorate([
    mongoose_1.Prop({ type: String, default: 'NEW' }),
    __metadata("design:type", String)
], Order.prototype, "PayStatus", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Order.prototype, "DeliveryAddress", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Order.prototype, "Image", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Object)
], Order.prototype, "UserId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Object)
], Order.prototype, "RestaurantId", void 0);
__decorate([
    mongoose_1.Prop({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Order.prototype, "CreatedOn", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Array)
], Order.prototype, "Items", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Array)
], Order.prototype, "Tracks", void 0);
Order = __decorate([
    mongoose_1.Schema()
], Order);
exports.Order = Order;
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
//# sourceMappingURL=order.schema.js.map