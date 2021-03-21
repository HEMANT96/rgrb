import { Restaurant } from "./interfaces/restaurant.interface";
import { Model } from "mongoose";
export declare class RestaurantService {
    private readonly RestaurantModel;
    constructor(RestaurantModel: Model<Restaurant>);
    findAll(): Promise<Restaurant[]>;
    findOne(id: string): Promise<Restaurant>;
    getByRestaurantId(RestaurantId: number): Promise<Restaurant>;
    register(restaurant: Restaurant): Promise<any>;
    updateRestaurant(id: any, restaurant: any): Promise<Restaurant>;
}
