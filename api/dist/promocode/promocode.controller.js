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
exports.PromocodeController = void 0;
const common_1 = require("@nestjs/common");
const create_promocode_dto_1 = require("./dto/create-promocode.dto");
const promocode_service_1 = require("./promocode.service");
let PromocodeController = class PromocodeController {
    constructor(promocodeService) {
        this.promocodeService = promocodeService;
    }
    async findAll() {
        return this.promocodeService.findAll();
    }
    async findOne(id) {
        return this.promocodeService.findOne(id);
    }
    async getByPromocodeId(PromocodeId) {
        return this.promocodeService.getByPromocodeId(PromocodeId);
    }
    async register(createPromocodeDto) {
        return this.promocodeService.register(createPromocodeDto);
    }
    async updatePromocode(id, Promocode) {
        return this.promocodeService.updatePromocode(id, Promocode);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromocodeController.prototype, "findAll", null);
__decorate([
    common_1.Get(":id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PromocodeController.prototype, "findOne", null);
__decorate([
    common_1.Get("/promocode/:PromocodeId"),
    __param(0, common_1.Param("PromocodeId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PromocodeController.prototype, "getByPromocodeId", null);
__decorate([
    common_1.Post('/add'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_promocode_dto_1.CreatePromocodeDto]),
    __metadata("design:returntype", Promise)
], PromocodeController.prototype, "register", null);
__decorate([
    common_1.Put("update/:id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PromocodeController.prototype, "updatePromocode", null);
PromocodeController = __decorate([
    common_1.Controller("promocode"),
    __metadata("design:paramtypes", [promocode_service_1.PromocodeService])
], PromocodeController);
exports.PromocodeController = PromocodeController;
//# sourceMappingURL=promocode.controller.js.map