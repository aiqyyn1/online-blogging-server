import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  img: string;
}
