import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from "./interfaces/menu.interface";
import { MenuService } from "./menus.service";
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    findAll(query: any): Promise<Menu[]>;
    findOne(id: any): Promise<Menu>;
    register(createMenuDto: CreateMenuDto): Promise<Menu>;
    updatePaymentStatus(id: string, status: string): Promise<Menu>;
    updateMenus(id: string, menus: any): Promise<Menu>;
}
