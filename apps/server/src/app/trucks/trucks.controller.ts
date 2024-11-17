import { Controller, Get } from '@nestjs/common';
import { TrucksService } from './trucks.service';

@Controller('v1')
export class TrucksController {
    constructor(private readonly trucksService: TrucksService){}

    @Get('trucks')
    getTrucks() {
        return this.trucksService.find();
    }
}
