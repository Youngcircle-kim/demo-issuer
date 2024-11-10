import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AgentService } from 'src/agent/agent.service';
import { CredentialDto } from './dto/crednetial.dto';
import { StudentService } from 'src/students/students.service';

@Injectable()
export class CredentialsService {
  constructor(
    private readonly agentService: AgentService,
    private readonly studentService: StudentService,
  ) {}

  async handleCredentialData(credentialDto: CredentialDto) {
    // 자격 증명 객체 생성
    const defaultCredential = {
      comment: 'string',
      credential_proposal: {
        '@type':
          'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview',
        attributes: [],
      },
      schema_issuer_did: '',
      connection_id: '',
      schema_version: '',
      schema_id: '',
      issuer_did: '',
      cred_def_id: '',
      schema_name: '',
    };
    const {
      schemaId,
      credentialDefinitionId,
      connectionId,
      certificateType,
      did,
    } = credentialDto;

    const credential = { ...defaultCredential };
    // 스키마 ID 처리
    const schemaArr = schemaId.split(':');
    if (schemaArr.length >= 4) {
      credential.schema_issuer_did = schemaArr[0];
      credential.schema_name = schemaArr[2];
      credential.schema_version = schemaArr[3];
    } else {
      throw new HttpException(
        'Invalid schemaId format',
        HttpStatus.BAD_REQUEST,
      );
    }
    credential.schema_id = schemaId;
    // 자격 증명 정의 ID 처리
    const credDefArr = credentialDefinitionId.split(':');
    if (credDefArr.length >= 1) {
      credential.issuer_did = credDefArr[0];
    } else {
      throw new HttpException(
        'Invalid credentialDefinitionId format',
        HttpStatus.BAD_REQUEST,
      );
    }
    credential.cred_def_id = credentialDefinitionId;

    credential.connection_id = connectionId;
    const attributes = await this.handleAttributeData(certificateType, did);
    try {
      credential.credential_proposal.attributes = attributes;
    } catch (error) {
      throw new HttpException(
        'Invalid credential attributes JSON',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.agentService.sendCredential(credential);
      return { message: 'Credential sent successfully' };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to send credential',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async handleAttributeData(certificateType: string, did: string) {
    // 학생 정보 가져오기
    const student = await this.studentService.findOneByDid(did);
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    // 증명서 타입에 따라 필요한 속성 구성
    let attributes = [];

    switch (certificateType) {
      case '재학증명서':
        attributes = [
          { name: 'name', value: `${student.first_name} ${student.last_name}` },
          { name: 'student_id', value: student.student_id.toString() },
          { name: 'department', value: student.department.department_name },
        ];
        break;
      case '졸업증명서':
        // 졸업 여부 확인 등 추가 로직 필요
        if (!student.graduation_date) {
          throw new HttpException(
            'Graduation date is not existed',
            HttpStatus.BAD_REQUEST,
          );
        }
        attributes = [
          { name: 'name', value: `${student.first_name} ${student.last_name}` },
          { name: 'student_id', value: student.student_id.toString() },
          { name: 'department', value: student.department.department_name },
          {
            name: 'graduation_date',
            value: student.graduation_date.toString(),
          },
        ];
        break;
      // 다른 증명서 타입에 대한 처리 추가
      default:
        throw new HttpException(
          'Unsupported certificate type',
          HttpStatus.BAD_REQUEST,
        );
    }

    return attributes;
  }
}
