import { Injectable } from '@nestjs/common';
import { AgentService } from 'src/agent/agent.service';
import { AcceptInvitationDto } from './dto/AcceptInvitation.dto';

@Injectable()
export class ConnectionsService {
  constructor(private readonly agentService: AgentService) {}
  async getActiveConnections() {
    const allConnections = await this.agentService.getConnections();
    const connections = allConnections.filter(
      (connection) =>
        connection.state === 'active' || connection.state === 'request',
    );
    return connections;
  }

  async getPendingConnections() {
    const allConnections = await this.agentService.getConnections();
    const connections = allConnections.filter(
      (connection) => connection.state === 'invitation',
    );

    return connections;
  }

  async createNewConnection() {
    const invitation = await this.agentService.createInvitation();
    return {
      invitation,
    };
  }

  async acceptConnection(acceptInvitationDto: AcceptInvitationDto) {
    try {
      const invitation = JSON.parse(acceptInvitationDto.invitation_object);
      await this.agentService.receiveInvitation(invitation);
      return {
        message: 'Invitation accepted',
      };
    } catch (error) {
      return {
        errors: ['Invalid invitation object'],
      };
    }
  }

  async removeConnection(id: string, state: string) {
    await this.agentService.removeConnection(id);
    return {
      url: `/connections/${state === 'invitation' ? 'pending' : 'active'}`,
    };
  }

  async getConnections() {
    const connections = await this.agentService.getConnections();
    return connections.filter(
      (connections) =>
        connections.state === 'active' || connections.state === 'request',
    );
  }
}
