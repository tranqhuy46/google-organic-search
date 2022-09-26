import { KeywordReport } from "@gsc/server/entity/KeywordReport";
import { AppDataSource } from "../data_source";

/** errors */
// class ReportFailed extends CustomError {
//   public static readonly Msg = "user-create-failed-db";
//   public static readonly HttpStatus = HttpStatusCodes.INTERNAL_SERVER_ERROR;
//   constructor() {
//     super(ReportFailed.Msg, ReportFailed.HttpStatus);
//   }
// }

const keywordReportRepository = AppDataSource.getRepository(KeywordReport);

/** API(s) */

async function findOneByKeyword(keyword: string, ownerId: string) {
  try {
    const foundReport = await keywordReportRepository.findOneBy({
      keyword,
      owner: {
        id: ownerId,
      },
    });
    return foundReport;
  } catch (error) {
    throw error;
  }
}

async function findUserKeywordReports(ownerId: string) {
  try {
    const reports = await keywordReportRepository.find({
      select: {
        id: true,
        keyword: true,
        status: true,
        totalAdwords: true,
        totalResults: true,
        totalSeconds: true,
        // NOTE: html and links are very heavy!
      },
      where: {
        owner: { id: ownerId },
      },
    });
    return reports;
  } catch (error) {
    throw error;
  }
}

async function upsertKeywordReport(reportPayload: Partial<KeywordReport>) {
  try {
    const report = await keywordReportRepository.save(reportPayload);
    return report;
  } catch (error) {
    throw error;
  }
}

async function findKeywordReportDetail(id: string, ownerId: string) {
  try {
    const foundReport = await keywordReportRepository.findOneBy({
      id,
      owner: {
        id: ownerId,
      },
    });
    return foundReport;
  } catch (error) {
    throw error;
  }
}

export default {
  findOneByKeyword,
  upsertKeywordReport,
  findUserKeywordReports,
  findKeywordReportDetail,
} as const;
