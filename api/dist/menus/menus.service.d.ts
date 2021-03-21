import { Menu } from "./interfaces/menu.interface";
import { Model } from 'mongoose';
export declare class MenuService {
    private readonly MenuModel;
    constructor(MenuModel: Model<Menu>);
    findAll(query: any): Promise<Menu[]>;
    findOne(id: string): Promise<Menu>;
    updateMenuStatus(id: string, status: string): Promise<Menu>;
    register(menu: Menu): Promise<any>;
    updateMenu(id: any, menu: any): Promise<Menu>;
}
