import { PaymentInfo } from "../../models/payment-info.model";
import { Material } from "./material.model";
import { TruckType } from "./truck-type.model";

export class TruckProvider {
        constructor (
            public company: string, 
            public license: string, 
            public phone: string, 
            public address: string,
            public city: string,
            public zip: string,
            public state: string,
            public truckingFleet: TruckType[],
            public materials: Material[],
            public paymentInfo: PaymentInfo
        ) {}
}