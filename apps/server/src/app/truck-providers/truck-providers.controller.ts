import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthType } from '../auth/enums/auth-type.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { TruckProvidersService } from './truck-provider.service';
import { SaveTruckProvidersDto } from './DTOs/save-truck-providers.dto';

@Auth(AuthType.Bearer)
@Controller('v1/truck-providers')
export class TruckProvidersController {
    constructor(private readonly truckProvidersService: TruckProvidersService){}

    @Get('provider')
    @HttpCode(HttpStatus.OK)
    getTruckProviders() {
        return this.truckProvidersService.find();
    }

    @Post('save-provider')
    @HttpCode(HttpStatus.OK)
    saveTruckProviders(@Body() saveTruckProvidersDto: SaveTruckProvidersDto) {
        console.log('wtf: ', saveTruckProvidersDto);
        return this.truckProvidersService.save(saveTruckProvidersDto);
    }

}
