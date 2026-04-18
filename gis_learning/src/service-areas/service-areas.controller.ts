import { Controller, Get, Param } from '@nestjs/common';
import { ServiceAreasService } from './service-areas.service';

@Controller('service-areas')
export class ServiceAreasController {
	constructor(private readonly service: ServiceAreasService) {}

	@Get()
	async getAreas() {
		return this.service.getAllAreas();
	}

	@Get(':id/poles')
	getPoles(@Param('id') id: string) {
		return this.service.getPolesInArea(Number(id));
	}
}
