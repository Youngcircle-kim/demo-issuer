import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  findOneByDid(did: string): Promise<Student> {
    return this.studentRepository.findOne({
      where: { did },
      relations: ['department'],
    });
  }
}
