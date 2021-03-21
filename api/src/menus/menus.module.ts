import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuController } from './menus.controller'
import { MenuService } from './menus.service';
import { MenuSchema } from './schemas/menu.schema';

@Module({
    imports: [MenuModule, MongooseModule.forFeature([{ name: 'Menu', schema: MenuSchema}])],
    controllers: [MenuController],
    providers: [MenuService]
})
export class MenuModule {}
