import { IsNotEmpty } from "class-validator";
//import { ServiceType } from "../enums/service-type.enum";
import { User } from "../../users/user.entity";
import { ServiceType } from "../enums/service-type.enum";

export class SaveTruckProvidersDto {

    @IsNotEmpty()
    company: string;

    @IsNotEmpty()
    license: string;

    @IsNotEmpty()
    //@IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    zip: string;

    @IsNotEmpty()
    state: string;

    user: User;

    cardholderName: string;

    cardNumber: string;

    expDate: string;

    securityCode: string;

    trucks: {
        type: string;
        min_capacity: number;
        max_capacity: number;
        service_type: ServiceType;
        price_per_mile: number;
    }[];

    comments: string;

   /* price_per_mile: number;

    materials: {
        type: string;
        price_per_unit: number;
    }[]*/
}