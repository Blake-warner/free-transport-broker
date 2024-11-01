import { IsNotEmpty } from "class-validator";
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

    trucks: {
        type: string;
        load_capacity: string;
        service_type: ServiceType;
        price_per_mile: number;
    }[]
    materials: {
        type: string;
        price_per_unit: number;
    }[]
}