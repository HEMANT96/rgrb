import { CreatePromocodeDto } from "./dto/create-promocode.dto";
import { Promocode } from "./interfaces/promocode.interface";
import { PromocodeService } from "./promocode.service";
export declare class PromocodeController {
    private readonly promocodeService;
    constructor(promocodeService: PromocodeService);
    findAll(): Promise<Promocode[]>;
    findOne(id: any): Promise<Promocode>;
    getByPromocodeId(PromocodeId: any): Promise<Promocode>;
    register(createPromocodeDto: CreatePromocodeDto): Promise<Promocode>;
    updatePromocode(id: string, Promocode: any): Promise<Promocode>;
}
