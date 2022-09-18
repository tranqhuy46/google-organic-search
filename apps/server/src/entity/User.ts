import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
