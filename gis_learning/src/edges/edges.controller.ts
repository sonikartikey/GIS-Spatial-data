import { Controller, Get } from '@nestjs/common';
import { EdgesService } from './edges.service';

@Controller('edges')
export class EdgesController {
	constructor(private readonly service: EdgesService) {}

	@Get()
	getEdges() {
		return this.service.getAllEdges();
	}
}
