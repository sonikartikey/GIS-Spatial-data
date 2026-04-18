import { Controller, Get, Param } from '@nestjs/common';
import { NetworkService } from './network.service';

@Controller('network')
export class NetworkController {
	constructor(private readonly service: NetworkService) {}

	@Get('trace/:nodeId')
	trace(@Param('nodeId') nodeId: string) {
		return this.service.traceNetwork(Number(nodeId));
	}
}
