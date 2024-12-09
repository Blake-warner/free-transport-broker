import { Controller, Get } from '@nestjs/common';
import { MaterialsService } from './materials.service';

@Controller('v1')
export class MaterialsController {
    constructor(private readonly materialsService: MaterialsService) {}
    @Get('materials')
    getMaterials() {
        return this.materialsService.find();
    }
}
