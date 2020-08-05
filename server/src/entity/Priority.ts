import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Issue } from './Issue';

@Entity()
export class Priority {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    icon?: string;

    @Column()
    color?: string;

    @Column()
    title?: string;

    @OneToMany(type => Issue, issue => issue.priority)
    issues?: Issue[]
}