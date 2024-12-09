import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthType } from '../auth/enums/auth-type.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { ProvidersService } from './services/provider.service';
import { SaveTruckProvidersDto } from './DTOs/save-truck-providers.dto';
import { ProviderTrucksService } from './services/provider-trucks.service';

@Auth(AuthType.Bearer)
@Controller('v1/truck-providers')
export class ProvidersController {
    constructor(
        private readonly providerTrucks: ProviderTrucksService,
        private readonly providersService: ProvidersService
    ){}

    @Get('provider')
    @HttpCode(HttpStatus.OK)
    getTruckProviders() {
        return this.providersService.find();
    }

    @Post('save-provider')
    @HttpCode(HttpStatus.OK)
    saveTruckProviders(@Body() saveTruckProvidersDto: SaveTruckProvidersDto) {
        //this.providerTrucks.save(saveTruckProvidersDto.trucks[0].)
        console.log('truck provider: ', saveTruckProvidersDto);
        return this.providersService.save(saveTruckProvidersDto);
    }

}
