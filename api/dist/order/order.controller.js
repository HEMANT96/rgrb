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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const create_order_dto_1 = require("./dto/create-order.dto");
const order_service_1 = require("./order.service");
const env_1 = require("../env");
const stripe = require('stripe')(env_1.geyKeyValue('STRIPE_KEY'));
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async register(createOrderDto) {
        return this.orderService.register(createOrderDto);
    }
    async updateStatus(id, status) {
        return this.orderService.updateStatus(id, status);
    }
    async findOne(userId) {
        return this.orderService.getOrderByUserId(userId);
    }
    async updateAddress(id, address) {
        return this.orderService.updateAddress(id, address);
    }
    async updatePaymentStatus(id, status) {
        return this.orderService.updatePaymentStatus(id, status);
    }
    async createCheckoutSession(orderId) {
        const WEBAPP_ENDPOINT = env_1.geyKeyValue('WEBAPP_ENDPOINT');
        var order = await this.orderService.getOrderDetailsById(orderId);
        var items = (order || {}).Items || [];
        const line_itmes = [];
        for (var i = 0; i < items.length; i++) {
            line_itmes.push({
                price_data: {
                    currency: 'cad',
                    product_data: {
                        name: items[i].MenuId.Name,
                        images: [items[i].MenuId.Image],
                    },
                    unit_amount: parseFloat(items[i].MenuId.Price) * 100,
                },
                quantity: items[i].Quantity,
            });
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_itmes,
            mode: 'payment',
            success_url: `${WEBAPP_ENDPOINT}/tabs/profile/success-payment?oid=${orderId}`,
            cancel_url: `${WEBAPP_ENDPOINT}/tabs/profile/cancle-payment?oid=${orderId}`,
        });
        this.orderService.updatePaymentStatus(orderId, 'Initiated');
        return { id: session.id };
    }
    ;
};
__decorate([
    common_1.Post('/add'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "register", null);
__decorate([
    common_1.Post('/update-status/:id/:status'),
    __param(0, common_1.Param("id")), __param(1, common_1.Param("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateStatus", null);
__decorate([
    common_1.Get(":userId"),
    __param(0, common_1.Param("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOne", null);
__decorate([
    common_1.Post('/update-address/:id/'),
    __param(0, common_1.Param("id")), __param(1, common_1.Body("Address")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateAddress", null);
__decorate([
    common_1.Post('/update-pay-status/:id/'),
    __param(0, common_1.Param("id")), __param(1, common_1.Body("Status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updatePaymentStatus", null);
__decorate([
    common_1.Post('/create-checkout-session'),
    __param(0, common_1.Body("orderId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createCheckoutSession", null);
OrderController = __decorate([
    common_1.Controller("orders"),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map