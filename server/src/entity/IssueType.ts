import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class IssueType {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    icon?: string;

    @Column()
    color?: string;

    @Column()
    title?: string;
}
