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
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const create_menu_dto_1 = require("./dto/create-menu.dto");
const menus_service_1 = require("./menus.service");
let MenuController = class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }
    async findAll(query) {
        return this.menuService.findAll(query || {});
    }
    async findOne(id) {
        return this.menuService.findOne(id);
    }
    async register(createMenuDto) {
        return this.menuService.register(createMenuDto);
    }
    async updatePaymentStatus(id, status) {
        return this.menuService.updateMenuStatus(id, status);
    }
    async updateMenus(id, menus) {
        return this.menuService.updateMenu(id, menus);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "findAll", null);
__decorate([
    common_1.Get(":id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "findOne", null);
__decorate([
    common_1.Post('/add'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_menu_dto_1.CreateMenuDto]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "register", null);
__decorate([
    common_1.Post('/update-menu-status/:id/'),
    __param(0, common_1.Param("id")), __param(1, common_1.Body("Status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "updatePaymentStatus", null);
__decorate([
    common_1.Put("update/:id"),
    __param(0, common_1.Param("id")), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "updateMenus", null);
MenuController = __decorate([
    common_1.Controller("menus"),
    __metadata("design:paramtypes", [menus_service_1.MenuService])
], MenuController);
exports.MenuController = MenuController;
//# sourceMappingURL=menus.controller.js.map