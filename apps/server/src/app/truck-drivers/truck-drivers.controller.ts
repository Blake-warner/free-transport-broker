import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthType } from '../auth/enums/auth-type.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { TruckDriversService } from './truck-drivers.service';
import { SaveTruckDriverDto } from './DTOs/SaveTruckDrive.dto';

@Auth(AuthType.Bearer)
@Controller('truck-drivers')
export class TruckDriversController {
    constructor(private readonly truckDriversService: TruckDriversService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    getTruckDrivers() {
        return this.truckDriversService.find();
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    saveTruckDriver(@Body() saveTruckDriverDto: SaveTruckDriverDto) {
        return this.truckDriversService.save(saveTruckDriverDto);
    }

}
