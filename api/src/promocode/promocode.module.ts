import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromocodeController } from './promocode.controller';
import { PromocodeService } from './promocode.service';
import { PromocodeSchema } from './schemas/promocode.schema';

@Module({
    imports: [PromocodeModule, MongooseModule.forFeature([{ name: 'Promocode', schema: PromocodeSchema}])],
    controllers: [PromocodeController],
    providers: [PromocodeService],
})
export class PromocodeModule {}
