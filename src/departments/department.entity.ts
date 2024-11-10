import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from '../students/student.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column()
  department_name: string;

  @OneToMany(() => Student, (student) => student.department)
  students: Student[];
}
