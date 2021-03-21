import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MenuModule} from './menus/menus.module';
import { RestaurantModule} from './restaurant/restaurant.module';
import { CategoriesModule} from './categories/categories.module';
import { OrderModule } from './order/order.module';
import { PromocodeModule } from './promocode/promocode.module';
import { MongooseModule } from '@nestjs/mongoose';
import { geyKeyValue } from './env';

const DB_URL = geyKeyValue('DB_URL')
console.log(DB_URL);


@Module({
  imports: [MenuModule, RestaurantModule, UserModule, CategoriesModule, OrderModule,PromocodeModule, MongooseModule.forRoot(DB_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

