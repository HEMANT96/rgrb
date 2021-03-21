import { Order } from "./interfaces/order.interface";
import { Model } from 'mongoose';
export declare class OrderService {
    private readonly OrderModel;
    constructor(OrderModel: Model<Order>);
    updateStatus(id: string, status: string): Promise<Order>;
    updateAddress(id: string, address: string): Promise<Order>;
    updatePaymentStatus(id: string, status: string): Promise<Order>;
    register(order: Order): Promise<Order>;
    getOrderDetailsById(orderId: any): Promise<Order>;
    getOrderByUserId(userId: any): Promise<Order[]>;
}
