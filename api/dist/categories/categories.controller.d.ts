import { CreateCategoriesDto } from "./dto/create-categories.dto";
import { Categories } from "./interfaces/categories.interface";
import { CategoriesService } from "./categories.service";
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<Categories[]>;
    findOne(id: any): Promise<Categories>;
    s: any;
    register(createCategoriesDto: CreateCategoriesDto): Promise<Categories>;
    updateCategories(id: string, categories: any): Promise<Categories>;
}
