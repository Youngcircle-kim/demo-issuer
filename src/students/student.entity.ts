import { IsEmail } from 'class-validator';
import { Certificate } from 'src/certificates/certificate.entity';
import { Department } from 'src/departments/department.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryColumn()
  student_id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column()
  @IsEmail()
  email: string;

  @Column({ unique: true })
  did: string;

  @Column({ nullable: true, type: 'date' })
  graduation_date: Date;

  @ManyToOne(() => Department, (department) => department.students)
  department: Department;

  @OneToMany(() => Certificate, (certificate) => certificate.student)
  certificates: Certificate[];
}
