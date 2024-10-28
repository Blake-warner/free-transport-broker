import { IsNotEmpty, IsPhoneNumber } from "class-validator";
import { ServiceType } from "../enums/service-type.enum";

export class SaveTruckDriverDto {

    @IsNotEmpty()
    company_name: string;

    @IsNotEmpty()
    license_number: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone_number: string;

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
        unit_for_weight: string;
        price_per_unit: number;
    }[]
}