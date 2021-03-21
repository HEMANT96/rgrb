import { Promocode } from "./interfaces/promocode.interface";
import { Model } from "mongoose";
export declare class PromocodeService {
    private readonly PromocodeModel;
    constructor(PromocodeModel: Model<Promocode>);
    findAll(): Promise<Promocode[]>;
    findOne(id: string): Promise<Promocode>;
    getByPromocodeId(PromocodeId: number): Promise<Promocode>;
    register(promocode: Promocode): Promise<any>;
    updatePromocode(id: any, promocode: any): Promise<Promocode>;
}
