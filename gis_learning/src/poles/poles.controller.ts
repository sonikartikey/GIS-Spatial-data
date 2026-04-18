import { Controller, Get } from '@nestjs/common';
import { PolesService } from './poles.service';

@Controller('poles')
export class PolesController {
	constructor(private readonly polesService: PolesService) {}

	@Get()
	async getPoles() {
		return this.polesService.getAllPoles();
	}
}
