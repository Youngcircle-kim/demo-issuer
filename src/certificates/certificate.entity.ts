import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../students/student.entity';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
  certificate_id: number;

  @ManyToOne(() => Student, (student) => student.certificates)
  student: Student;

  @Column()
  certificate_type: string; // 예: 졸업증명서, 재학증명서

  @Column({ type: 'date' })
  issue_date: Date;

  @Column({ nullable: true })
  remarks: string;
}
