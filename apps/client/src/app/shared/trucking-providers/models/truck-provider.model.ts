import { Material } from "./material.model";
import { Truck } from "../../trucks/truck.inteface";

export class TruckProvider {
        constructor (
            public company: string, 
            public license: string, 
            public phone: string, 
            public address: string,
            public city: string,
            public zip: string,
            public state: string,
            public cardholderName: string,
            public cardNumber: string,
            public expDate: string,
            public securityCode: string,
            public comments: string,
            public trucks?: Truck[],
            public materials?: Material[],
        ) {}
}