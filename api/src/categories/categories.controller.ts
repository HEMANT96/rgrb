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
  import { CreateCategoriesDto } from "./dto/create-categories.dto";
  import { Categories } from "./interfaces/categories.interface";
  import { CategoriesService } from "./categories.service";
  
  @Controller("categories")
  export class  CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
  
    @Get()
    async findAll(): Promise<Categories[]> {
      return this.categoriesService.findAll();
    }
    @Get(":id")
    async findOne(@Param("id") id): Promise<Categories> {
      return this.categoriesService.findOne(id);
    }
   /*  @Get("/categories/:CategoriesId")
    async getByCategoriesById(@Param("CategoriesId") CategoriesId): Promise<Categories> {
      return this.categoriesService.getByCategoriesById(CategoriesId);
    } */s
    @Post('/add')
    async register(@Body() createCategoriesDto: CreateCategoriesDto): Promise<Categories> {
      return this.categoriesService.register(createCategoriesDto);
    } 

    @Put("update/:id")
    async updateCategories(@Param("id") id: string, @Body() categories: any): Promise<Categories> {
     return this.categoriesService.updateCategories(id, categories);
   } 
 }
  