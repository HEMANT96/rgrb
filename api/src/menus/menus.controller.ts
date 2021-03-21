import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query
  } from "@nestjs/common";
  import { create } from "domain";
  import { CreateMenuDto } from './dto/create-menu.dto';
  import { Menu } from "./interfaces/menu.interface";
  import { MenuService } from "./menus.service";
  
  @Controller("menus")
  export class  MenuController {
    constructor(private readonly menuService: MenuService) {}
  
    @Get()
    async findAll(@Query() query): Promise<Menu[]> {
      return this.menuService.findAll(query || {});
    }
    @Get(":id")
    async findOne(@Param("id") id): Promise<Menu> {
      return this.menuService.findOne(id);
    }
    
    @Post('/add')
    async register(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
      return this.menuService.register(createMenuDto);
    } 
    @Post('/update-menu-status/:id/')
    async updatePaymentStatus(@Param("id") id: string, @Body("Status") status: string): Promise<Menu> {
    return this.menuService.updateMenuStatus(id, status);
    }
  
    @Put("update/:id")
    async updateMenus(@Param("id") id: string, @Body() menus: any): Promise<Menu> {
     return this.menuService.updateMenu(id, menus);
   } 
 }
  