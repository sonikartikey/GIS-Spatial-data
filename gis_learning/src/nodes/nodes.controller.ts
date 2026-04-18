import { Controller, Get } from '@nestjs/common';
import { NodesService } from './nodes.service';

@Controller('nodes')
export class NodesController {
	constructor(private readonly service: NodesService) {}

	@Get()
	getNodes() {
		return this.service.getAllNodes();
	}
}
