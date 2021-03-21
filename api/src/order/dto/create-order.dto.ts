export class CreateOrderDto{
    readonly Price: string;
    readonly Discount: string;
    readonly Taxes: string;
    readonly DeliveryCharge: string;
    readonly FinalPrice: string;
    readonly Image: string;
    readonly RestaurantId: string;
    readonly UserId : string;
    readonly Items: any;
    readonly Tracks: any
}
