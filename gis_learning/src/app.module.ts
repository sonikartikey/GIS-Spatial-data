import { Module } from '@nestjs/common';
import { PolesController } from './poles/poles.controller';
import { PolesService } from './poles/poles.service';
import { LinesController } from './lines/lines.controller';
import { LinesService } from './lines/lines.service';
import { ServiceAreasController } from './service-areas/service-areas.controller';
import { ServiceAreasService } from './service-areas/service-areas.service';
import { NetworkController } from './network/network.controller';
import { NetworkService } from './network/network.service';
import { NodesController } from './nodes/nodes.controller';
import { NodesService } from './nodes/nodes.service';
import { EdgesController } from './edges/edges.controller';
import { EdgesService } from './edges/edges.service';

@Module({
	controllers: [
		PolesController,
		LinesController,
		ServiceAreasController,
		NetworkController,
		NodesController,
		EdgesController,
	],
	providers: [
		PolesService,
		LinesService,
		ServiceAreasService,
		NetworkService,
		NodesService,
		EdgesService,
	],
})
export class AppModule {}
