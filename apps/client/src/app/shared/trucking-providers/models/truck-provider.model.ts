//import { PaymentInfo } from "../../models/payment-info.model";
import { Material } from "./material.model";
//import { TruckType } from "../../trucks/truck-type.model";
import { Truck } from "../../trucks/truck.inteface";
import { User } from "../../../pages/auth/user/user";

export class TruckProvider {
        constructor (
            public company: string, 
            public license: string, 
            public phone: string, 
            public address: string,
            public city: string,
            public zip: string,
            public state: string,
            //public pricePerMile: number,
            //public paymentInfo: PaymentInfo,
            public user: User,
            public cardholderName: string,
            public cardNumber: string,
            public expDate: string,
            public securityCode: string,
            public comments: string,
            public trucks?: Truck[],
            //public materials?: Material[],
        ) {}
}