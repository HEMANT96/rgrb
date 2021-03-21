import { Categories } from "./interfaces/categories.interface";
import { Model } from "mongoose";
export declare class CategoriesService {
    private readonly CategoriesModel;
    constructor(CategoriesModel: Model<Categories>);
    findAll(): Promise<Categories[]>;
    findOne(id: string): Promise<Categories>;
    register(categories: Categories): Promise<any>;
    updateCategories(id: any, categories: any): Promise<Categories>;
}
