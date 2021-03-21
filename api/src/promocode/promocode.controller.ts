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
  import { CreatePromocodeDto } from "./dto/create-promocode.dto";
  import { Promocode } from "./interfaces/promocode.interface";
  import { PromocodeService } from "./promocode.service";
  
  @Controller("promocode")
  export class  PromocodeController {
    constructor(private readonly promocodeService:PromocodeService) {}
  
    @Get()
    async findAll(): Promise<Promocode[]> {
      return this.promocodeService.findAll();
    }
    @Get(":id")
    async findOne(@Param("id") id): Promise<Promocode> {
      return this.promocodeService.findOne(id);
    }

    @Get("/promocode/:PromocodeId")
    async getByPromocodeId(@Param("PromocodeId") PromocodeId): Promise<Promocode> {
      return this.promocodeService.getByPromocodeId(PromocodeId);
    }
    
    @Post('/add')
     async register(@Body() createPromocodeDto: CreatePromocodeDto): Promise<Promocode> {
      return this.promocodeService.register(createPromocodeDto);
    }

    @Put("update/:id")
     async updatePromocode(@Param("id") id: string, @Body() Promocode: any): Promise<Promocode> {
      return this.promocodeService.updatePromocode(id, Promocode);
    } 
  }