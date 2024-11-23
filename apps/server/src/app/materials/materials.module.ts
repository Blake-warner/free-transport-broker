import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { materialsProvider } from './materials.provider';
import { MaterialsController } from './materials.controller';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [
    MaterialsService,
    ...materialsProvider
  ],
  controllers: [
    MaterialsController
  ]
})
export class MaterialsModule {}
