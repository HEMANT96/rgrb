import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesSchema } from './schemas/categories.schema';

@Module({
    imports: [CategoriesModule, MongooseModule.forFeature([{ name: 'Categories', schema: CategoriesSchema}])],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})
export class CategoriesModule {}
