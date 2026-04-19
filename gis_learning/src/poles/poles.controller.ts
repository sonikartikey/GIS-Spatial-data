import { Controller, Get, Query } from '@nestjs/common';
import { PolesService } from './poles.service';

@Controller('poles')
export class PolesController {
	constructor(private readonly polesService: PolesService) {}

	@Get()
	async getPoles(
		@Query('minLng') minLng?: string,
		@Query('minLat') minLat?: string,
		@Query('maxLng') maxLng?: string,
		@Query('maxLat') maxLat?: string,
	) {
		if (minLng && minLat && maxLng && maxLat) {
			return this.polesService.getPolesByBbox(
				Number(minLng),
				Number(minLat),
				Number(maxLng),
				Number(maxLat),
			);
		}

		return this.polesService.getAllPoles();
	}
}
