import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
  } from "@nestjs/common";
  import { create } from "domain";
  import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
  import { Restaurant } from "./interfaces/restaurant.interface";
  import { RestaurantService } from "./restaurant.service";
  
  @Controller("restaurant")
  export class  RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}
  
    @Get()
    async findAll(): Promise<Restaurant[]> {
      return this.restaurantService.findAll();
    }
    @Get(":id")
    async findOne(@Param("id") id): Promise<Restaurant> {
      return this.restaurantService.findOne(id);
    }

    @Get("/restaurent/:RestaurantId")
    async getByRestaurantId(@Param("RestaurantId") RestaurantId): Promise<Restaurant> {
      return this.restaurantService.getByRestaurantId(RestaurantId);
    }
    
    @Post('/add')
     async register(@Body() createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
      return this.restaurantService.register(createRestaurantDto);
    }

    @Put("update/:id")
     async updateRestaurant(@Param("id") id: string, @Body() restaurant: any): Promise<Restaurant> {
      return this.restaurantService.updateRestaurant(id, restaurant);
    } 
  }

