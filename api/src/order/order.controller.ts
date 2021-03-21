import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query
} from "@nestjs/common";
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from "./interfaces/order.interface";
import { OrderService } from "./order.service";
import { geyKeyValue } from '../env';
const stripe = require('stripe')(geyKeyValue('STRIPE_KEY'));

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post('/add')
  async register(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.register(createOrderDto);
  }

  @Post('/update-status/:id/:status')
  async updateStatus(@Param("id") id: string, @Param("status") status: string): Promise<Order> {
    return this.orderService.updateStatus(id, status);
  }

  @Get(":userId")
  async findOne(@Param("userId") userId): Promise<Order[]> {
    return this.orderService.getOrderByUserId(userId);
  }

  @Post('/update-address/:id/')
  async updateAddress(@Param("id") id: string, @Body("Address") address: string): Promise<Order> {
    return this.orderService.updateAddress(id, address);
  }

  @Post('/update-pay-status/:id/')
  async updatePaymentStatus(@Param("id") id: string, @Body("Status") status: string): Promise<Order> {
    return this.orderService.updatePaymentStatus(id, status);
  }
  

  @Post('/create-checkout-session')
  async createCheckoutSession(@Body("orderId") orderId: string) {
    const WEBAPP_ENDPOINT = geyKeyValue('WEBAPP_ENDPOINT');
    // var orderId = '60101652f0248227f96504d4';

    var order = await this.orderService.getOrderDetailsById(orderId);
    var items = (order || {}).Items || [];
    const line_itmes = [];
    
    for(var i = 0; i < items.length; i++){
      line_itmes.push({
        price_data: {
          currency: 'cad',
          product_data: {
            name: items[i].MenuId.Name,
            images: [items[i].MenuId.Image],
          },
          unit_amount: parseFloat(items[i].MenuId.Price) * 100 ,
        },
        quantity: items[i].Quantity,
      })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_itmes,
      mode: 'payment',
      success_url: `${WEBAPP_ENDPOINT}/tabs/profile/success-payment?oid=${orderId}`,
      cancel_url: `${WEBAPP_ENDPOINT}/tabs/profile/cancle-payment?oid=${orderId}`,
    });

    this.orderService.updatePaymentStatus(orderId, 'Initiated');

    return { id: session.id };
  };

}
