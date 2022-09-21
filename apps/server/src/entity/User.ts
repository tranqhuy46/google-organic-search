import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { KeywordReport } from "./KeywordReport";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => KeywordReport, (report) => report.owner)
  keywordReports: KeywordReport[];
}
