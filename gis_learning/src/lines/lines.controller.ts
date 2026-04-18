import { Controller, Get, Param } from '@nestjs/common';
import { LinesService } from './lines.service';

@Controller('lines')
export class LinesController {
	constructor(private readonly linesService: LinesService) {}

	@Get()
	async getLines() {
		return this.linesService.getAllLines();
	}

	@Get(':id/nearby-poles')
	getNearby(@Param('id') id: string) {
		return this.linesService.getNearbyPoles(Number(id));
	}
}
