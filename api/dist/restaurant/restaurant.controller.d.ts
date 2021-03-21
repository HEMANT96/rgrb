import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { Restaurant } from "./interfaces/restaurant.interface";
import { RestaurantService } from "./restaurant.service";
export declare class RestaurantController {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    findAll(): Promise<Restaurant[]>;
    findOne(id: any): Promise<Restaurant>;
    getByRestaurantId(RestaurantId: any): Promise<Restaurant>;
    register(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    updateRestaurant(id: string, restaurant: any): Promise<Restaurant>;
}
