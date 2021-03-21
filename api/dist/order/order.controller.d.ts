import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from "./interfaces/order.interface";
import { OrderService } from "./order.service";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    register(createOrderDto: CreateOrderDto): Promise<Order>;
    updateStatus(id: string, status: string): Promise<Order>;
    findOne(userId: any): Promise<Order[]>;
    updateAddress(id: string, address: string): Promise<Order>;
    updatePaymentStatus(id: string, status: string): Promise<Order>;
    createCheckoutSession(orderId: string): Promise<{
        id: any;
    }>;
}
