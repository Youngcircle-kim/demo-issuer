import { ConnectionsService } from './connections.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AcceptInvitationDto } from './dto/AcceptInvitation.dto';

@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Get()
  async getConnections() {
    const connections = await this.connectionsService.getConnections();
    return connections;
  }

  @Get('active')
  async getActiveConnections() {
    const connections = await this.connectionsService.getActiveConnections();
    return connections;
  }

  @Get('pending')
  async getPendingConnections() {
    const connections = await this.connectionsService.getPendingConnections();
    return connections;
  }

  @Post('new')
  async createNewConnection() {
    const invitation = await this.connectionsService.createNewConnection();
    return {
      invitation,
    };
  }

  @Post('accept')
  async acceptConnection(@Body() acceptInvitationDto: AcceptInvitationDto) {
    const message = await this.connectionsService.acceptConnection(
      acceptInvitationDto,
    );

    return {
      message,
    };
  }

  @Get(':id/remove')
  async removeConnection(
    @Param('id') id: string,
    @Query('state') state: string,
  ) {
    const url = await this.connectionsService.removeConnection(id, state);
    return {
      url,
    };
  }
}
