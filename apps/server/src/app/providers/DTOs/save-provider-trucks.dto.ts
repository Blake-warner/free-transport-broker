import { IsNotEmpty } from "class-validator";
//import { ServiceType } from "../enums/service-type.enum";
//import { User } from "../../users/user.entity";

export class SaveProviderTrucksDto {

    @IsNotEmpty()
    pricePerMile: number;

}