import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { KeywordReportStatus } from "ui/shared/type";
import { User } from "./User";

@Entity()
export class KeywordReport {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 126,
  })
  keyword: string;

  @Column({
    type: "text",
    nullable: true,
  })
  html?: string;

  @Column("varchar", { array: true, default: [] })
  links: string[];

  @Column({
    type: "int4",
    nullable: true,
  })
  totalAdwords?: number;

  @Column({
    type: "int8",
    nullable: true,
  })
  totalResults?: number;

  @Column({
    type: "real", // NOTE: 6 decimal digits precision
    nullable: true,
  })
  totalSeconds?: number;

  @Column({
    enum: [
      KeywordReportStatus.PROCESSING,
      KeywordReportStatus.DONE,
      KeywordReportStatus.FAILED,
    ],
    default: KeywordReportStatus.PROCESSING,
    nullable: false,
  })
  status: string;

  @ManyToOne(() => User, (user) => user.keywordReports)
  owner: User;
}
