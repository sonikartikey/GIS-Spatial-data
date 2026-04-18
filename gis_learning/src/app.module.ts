import { Module } from '@nestjs/common';
import { PolesController } from './poles/poles.controller';
import { PolesService } from './poles/poles.service';
import { LinesController } from './lines/lines.controller';
import { LinesService } from './lines/lines.service';
import { ServiceAreasController } from './service-areas/service-areas.controller';
import { ServiceAreasService } from './service-areas/service-areas.service';
@Module({
	controllers: [PolesController, LinesController, ServiceAreasController],
	providers: [PolesService, LinesService, ServiceAreasService],
})
export class AppModule {}
