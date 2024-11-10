import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AgentService {
  private readonly baseUrl;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    const hostname = this.configService.get<string>('hostname');
    const port: number = this.configService.get<number>('port');
    this.baseUrl = `http://${hostname}:${port}`;
  }

  async getStatus() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.baseUrl}/status`),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to get status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getConnections() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.baseUrl}/connections`),
      );
      return response.data.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async createInvitation() {
    try {
      const response = await lastValueFrom(
        this.httpService.post(
          `${this.baseUrl}/connections/create-invitation`,
          {},
        ),
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  async receiveInvitation(invitation: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(
          `${this.baseUrl}/connections/receive-invitation`,
          invitation,
        ),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to receive invitation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeConnection(connectionId: string) {
    try {
      await lastValueFrom(
        this.httpService.post(
          `${this.baseUrl}/connections/${connectionId}/remove`,
          {},
        ),
      );
    } catch (error) {
      throw new HttpException(
        'Failed to remove connection',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSchemas() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.baseUrl}/schemas/created`),
      );
      return response.data['schema_ids'];
    } catch (error) {
      throw new HttpException(
        'Failed to get schemas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSchema(schemaId: string) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.baseUrl}/schemas/${schemaId}`),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to get schema',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCredentialDefinitions() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.baseUrl}/credential-definitions/created`),
      );
      return response.data['credential_definition_ids'];
    } catch (error) {
      throw new HttpException(
        'Failed to get definitions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCredentialDefinition(credentialDefinitionId: string) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(
          `${this.baseUrl}/credential-definitions/${credentialDefinitionId}`,
        ),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to get definition',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sendCredential(credential) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(
          `${this.baseUrl}/issue-credential/send`,
          credential,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to issue credential',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
